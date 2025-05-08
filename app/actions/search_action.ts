"use server";

import { SearchChannelResult, SearchVideoResult } from "@/lib/services/interfaces/search_channel_interface";
import SearchService from "@/lib/services/search_service";
import SearchRepository from "@/lib/repositories/next_fetch/search_repository";

/**
 * チャンネル検索のサーバーアクション
 * フォームから送信されたクエリを使ってチャンネル検索を実行します
 * 
 * @param q 検索クエリ文字列
 * @param nextPageToken ページネーション用のトークン（オプション）
 * @returns {Promise<SearchChannelResult>} 検索結果
 */
export async function searchChannelAction(
  q: string,
  nextPageToken?: string
): Promise<SearchChannelResult> {
  // 検索リポジトリの初期化
  const searchRepository = new SearchRepository();
  
  // 検索サービスの初期化
  const searchService = new SearchService(searchRepository);
  
  // チャンネル検索の実行
  const result = await searchService.searchChannel(q, nextPageToken);
  
  return result;
}

/**
 * 動画検索のサーバーアクション
 * フォームから送信されたクエリを使って動画検索を実行します
 * 
 * @param q 検索クエリ文字列
 * @param nextPageToken ページネーション用のトークン（オプション）
 * @returns {Promise<SearchVideoResult>} 検索結果
 */
export async function searchVideoAction(
  q: string,
  nextPageToken?: string
): Promise<SearchVideoResult> {
  // 検索リポジトリの初期化
  const searchRepository = new SearchRepository();
  
  // 検索サービスの初期化
  const searchService = new SearchService(searchRepository);
  
  // 動画検索の実行
  const result = await searchService.searchVideo(q, nextPageToken);
  
  return result;
}