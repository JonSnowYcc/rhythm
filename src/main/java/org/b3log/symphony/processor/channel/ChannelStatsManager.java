package org.b3log.symphony.processor.channel;

import java.util.concurrent.*;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class ChannelStatsManager {
    private static final int CHANNEL_COUNT = 8;
    private static final int STATISTICS_INTERVAL_MINUTES = 10;
    private final Map<Integer, ChannelStatistics> channelStatsMap = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    public ChannelStatsManager() {
        // 初始化每个通道的统计数据
        for (int i = 0; i < CHANNEL_COUNT; i++) {
            channelStatsMap.put(i, new ChannelStatistics());
        }

        // 每隔10分钟重置统计数据
        scheduler.scheduleAtFixedRate(this::resetStatistics, STATISTICS_INTERVAL_MINUTES, STATISTICS_INTERVAL_MINUTES, TimeUnit.MINUTES);
    }

    /**
     * 当一个消息通过某个通道发送时调用此方法
     * @param channelId 发送消息的通道ID
     * @param messageSize 消息的大小（字节数）
     */
    public void onMessageSent(int channelId, int messageSize) {
        ChannelStatistics stats = channelStatsMap.get(channelId);
        if (stats != null) {
            stats.addMessage(messageSize);
        }
    }

    /**
     * 获取特定通道的平均上传带宽
     * @param channelId 通道ID
     * @return 平均上传带宽（KB/s）
     */
    public double getAverageUploadBandwidth(int channelId) {
        ChannelStatistics stats = channelStatsMap.get(channelId);
        return stats != null ? stats.getAverageBandwidth() : 0.0;
    }

    /**
     * 获取特定通道的消息总数
     * @param channelId 通道ID
     * @return 消息总数
     */
    public long getMessageCount(int channelId) {
        ChannelStatistics stats = channelStatsMap.get(channelId);
        return stats != null ? stats.getMessageCount() : 0L;
    }

    private void resetStatistics() {
        channelStatsMap.forEach((id, stats) -> stats.reset());
    }

    private static class ChannelStatistics {
        private final AtomicInteger messageCount = new AtomicInteger();
        private final AtomicLong totalBytesSent = new AtomicLong();
        private final AtomicLong startTime = new AtomicLong(System.currentTimeMillis());

        synchronized void addMessage(int messageSize) {
            messageCount.incrementAndGet();
            totalBytesSent.addAndGet(messageSize);
        }

        double getAverageBandwidth() {
            long elapsedMillis = System.currentTimeMillis() - startTime.get();
            if (elapsedMillis <= 0) return 0.0;
            return (totalBytesSent.get() * 1000.0) / (elapsedMillis * 1024); // 转换为KB/s
        }

        long getMessageCount() {
            return messageCount.get();
        }

        synchronized void reset() {
            messageCount.set(0);
            totalBytesSent.set(0);
            startTime.set(System.currentTimeMillis());
        }
    }
}