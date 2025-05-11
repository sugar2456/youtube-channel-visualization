import ChannelRepository from "@/lib/repositories/next_fetch/channel_repository";
import SearchRepository from "@/lib/repositories/next_fetch/search_repository";
import { ChannelService } from "@/lib/services/channel_service";
import { ChannelInfoResult, ChannelsVideoResult } from "@/lib/services/interfaces/channel_service_interface";

export async function getChannelsVideoAction(
  channelId: string,
  nextPageToken?: string
): Promise<ChannelsVideoResult> {
  const searchRepository = new SearchRepository();
  const channelRepository = new ChannelRepository();
  const channelService = new ChannelService(searchRepository, channelRepository);
  const result = await channelService.getRecentVideos(channelId, nextPageToken);
  return result;
}

export async function getChannelInfoAction(
  channelId: string
): Promise<ChannelInfoResult> {
  const searchRepository = new SearchRepository();
  const channelRepository = new ChannelRepository();
  const channelService = new ChannelService(searchRepository, channelRepository);
  const result = await channelService.getChannelInfo(channelId);
  return result;
}