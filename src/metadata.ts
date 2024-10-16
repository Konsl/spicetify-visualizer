export enum ExtensionKind {
	UNKNOWN_EXTENSION = 0,
	CANVAZ = 1, // type.googleapis.com/spotify.canvaz.cache.EntityCanvazResponse.Canvaz
	STORYLINES = 2,
	PODCAST_TOPICS = 3, // type.googleapis.com/spotify.podcast.extensions.PodcastTopics
	PODCAST_SEGMENTS = 4, // type.googleapis.com/spotify.podcast_segments.PodcastSegments
	AUDIO_FILES = 5, // type.googleapis.com/spotify.extendedmetadata.audiofiles.AudioFilesExtensionResponse
	TRACK_DESCRIPTOR = 6, // type.googleapis.com/spotify.descriptorextension.ExtensionDescriptorData
	PODCAST_COUNTER = 7,
	ARTIST_V4 = 8, // type.googleapis.com/spotify.metadata.Artist
	ALBUM_V4 = 9, // type.googleapis.com/spotify.metadata.Album
	TRACK_V4 = 10, // type.googleapis.com/spotify.metadata.Track
	SHOW_V4 = 11, // type.googleapis.com/spotify.metadata.Show
	EPISODE_V4 = 12, // type.googleapis.com/spotify.metadata.Episode
	PODCAST_HTML_DESCRIPTION = 13, // type.googleapis.com/spotify.podcast.extensions.PodcastHtmlDescription
	PODCAST_QUOTES = 14,
	USER_PROFILE = 15, // type.googleapis.com/spotify.identity.v3.UserProfile
	CANVAS_V1 = 16, // type.googleapis.com/spotify.canvaz.cache.EntityCanvazResponse.Canvaz
	SHOW_V4_BASE = 17,
	SHOW_V4_EPISODES_ASSOC = 18,
	TRACK_DESCRIPTOR_SIGNATURES = 19,
	PODCAST_AD_SEGMENTS = 20, // type.googleapis.com/spotify.ads.formats.PodcastAds
	EPISODE_TRANSCRIPTS = 21, // type.googleapis.com/spotify.corex.transcripts.metadata.EpisodeTranscript
	PODCAST_SUBSCRIPTIONS = 22,
	EXTRACTED_COLOR = 23, // type.googleapis.com/spotify.context_track_color.ColorResult
	PODCAST_VIRALITY = 24,
	IMAGE_SPARKLES_HACK = 25,
	PODCAST_POPULARITY_HACK = 26,
	AUTOMIX_MODE = 27,
	CUEPOINTS = 28, // type.googleapis.com/spotify.automix.proto.Cuepoints
	PODCAST_POLL = 29, // type.googleapis.com/spotify.polls.PodcastPoll
	EPISODE_ACCESS = 30,
	SHOW_ACCESS = 31,
	PODCAST_QNA = 32,
	CLIPS = 33,
	SHOW_V5 = 34,
	EPISODE_V5 = 35,
	PODCAST_CTA_CARDS = 36,
	PODCAST_RATING = 37, // type.googleapis.com/spotify.ratings.PodcastRating
	DISPLAY_SEGMENTS = 38, // type.googleapis.com/spotify.displaysegments.v1.DisplaySegmentsExtension
	GREENROOM = 39,
	USER_CREATED = 40,
	SHOW_DESCRIPTION = 41,
	SHOW_HTML_DESCRIPTION = 42,
	SHOW_PLAYABILITY = 43,
	EPISODE_DESCRIPTION = 44,
	EPISODE_HTML_DESCRIPTION = 45,
	EPISODE_PLAYABILITY = 46,
	SHOW_EPISODES_ASSOC = 47,
	CLIENT_CONFIG = 48, // type.googleapis.com/spotify.extendedmetadata.config.v1.ClientConfig
	PLAYLISTABILITY = 49, // type.googleapis.com/spotify.playlistability.proto.EntityPlaylistability
	AUDIOBOOK_V5 = 50,
	CHAPTER_V5 = 51,
	AUDIOBOOK_SPECIFICS = 52,
	EPISODE_RANKING = 53,
	HTML_DESCRIPTION = 54, // type.googleapis.com/spotify.podcast.extensions.PodcastHtmlDescription
	CREATOR_CHANNEL = 55,
	AUDIOBOOK_PROVIDERS = 56,
	PLAY_TRAIT = 57,
	CONTENT_WARNING = 58,
	IMAGE_CUE = 59,
	STREAM_COUNT = 60,
	AUDIO_ATTRIBUTES = 61, // type.googleapis.com/spotify.audioattributesextension.proto.AudioAttributesExtensionData
	NAVIGABLE_TRAIT = 62, // type.googleapis.com/spotify.creativework.v1.NavigableTrait
	NEXT_BEST_EPISODE = 63, // type.googleapis.com/spotify.nextepisode.NextEpisodeRecs
	AUDIOBOOK_PRICE = 64,
	EXPRESSIVE_PLAYLISTS = 65,
	DYNAMIC_SHOW_EPISODE = 66,
	LIVE = 67,
	SKIP_PLAYED = 68,
	AD_BREAK_FREE_PODCASTS = 69,
	ASSOCIATIONS = 70,
	PLAYLIST_EVALUATION = 71,
	CACHE_INVALIDATIONS = 72,
	LIVESTREAM_ENTITY = 73,
	SINGLE_TAP_REACTIONS = 74, // type.googleapis.com/spotify.reactions.v1.ReactionsMetadata
	USER_COMMENTS = 75,
	CLIENT_RESTRICTIONS = 76, // type.googleapis.com/spotify.clientrestrictions.v1.ClientRestrictionsExtensionData
	PODCAST_GUEST = 77,
	PLAYABILITY = 78, // type.googleapis.com/spotify.bumblebee.playability.v1.Playability
	COVER_IMAGE = 79, // type.googleapis.com/spotify.bumblebee.coverimage.v1.CoverImage
	SHARE_TRAIT = 80,
	INSTANCE_SHARING = 81,
	ARTIST_TOUR = 82, // type.googleapis.com/spotify.artisttour.v1.ArtistTour
	AUDIOBOOK_GENRE = 83, // type.googleapis.com/spotify.audiobookgenres.AudiobookGenres
	CONCEPT = 84,
	ORIGINAL_VIDEO = 85, // type.googleapis.com/spotify.bumblebee.originalvideo.v1.OriginalVideo
	SMART_SHUFFLE = 86, // type.googleapis.com/spotify.smartshuffle.SmartShuffle
	LIVE_EVENTS = 87,
	AUDIOBOOK_RELATIONS = 88,
	HOME_POC_BASECARD = 89,
	AUDIOBOOK_SUPPLEMENTS = 90,
	PAID_PODCAST_BANNER = 91,
	FEWER_ADS = 92, // type.googleapis.com/spotify.advisor.v1.IsShowAdBreakFreeExtensionResponse
	WATCH_FEED_SHOW_EXPLORER = 93,
	TRACK_EXTRA_DESCRIPTORS = 94,
	TRACK_EXTRA_AUDIO_ATTRIBUTES = 95,
	TRACK_EXTENDED_CREDITS = 96, // type.googleapis.com/spotify.extendedcredits.ExtendedCredits
	SIMPLE_TRAIT = 97, // type.googleapis.com/spotify.home.v1.SimpleCardTrait
	AUDIO_ASSOCIATIONS = 98,
	VIDEO_ASSOCIATIONS = 99, // type.googleapis.com/spotify.bumblebee.video_associations.v1.VideoAssociations
	PLAYLIST_TUNER = 100, // type.googleapis.com/spotify.playlist.tuner.PlaylistTunerExtension
	ARTIST_VIDEOS_ENTRYPOINT = 101,
	ALBUM_PRERELEASE = 102,
	CONTENT_ALTERNATIVES = 103, // type.googleapis.com/spotify.contentalternatives.v1.ContentAlternatives
	SNAPSHOT_SHARING = 105,
	DISPLAY_SEGMENTS_COUNT = 106, // type.googleapis.com/spotify.displaysegmentscount.v1.DisplaySegmentsCount
	PODCAST_FEATURED_EPISODE = 107,
	PODCAST_SPONSORED_CONTENT = 108, // type.googleapis.com/spotify.sponsoredcontentlistener.v1.SponsoredContentListenerPayload
	PODCAST_EPISODE_TOPICS_LLM = 109,
	PODCAST_EPISODE_TOPICS_KG = 110,
	EPISODE_RANKING_POPULARITY = 111, // type.googleapis.com/spotify.contentpopularity.v1.EntityPopularity
	MERCH = 112,
	COMPANION_CONTENT = 113, // type.googleapis.com/spotify.figs.companion_content.v0.CompanionContent
	WATCH_FEED_ENTITY_EXPLORER = 114,
	ANCHOR_CARD_TRAIT = 115,
	AUDIO_PREVIEW_PLAYBACK_TRAIT = 116, // type.googleapis.com/spotify.audiobrowse.v2.PreviewPlaybackTrait
	VIDEO_PREVIEW_STILL_TRAIT = 117,
	PREVIEW_CARD_TRAIT = 118, // type.googleapis.com/spotify.audiobrowse.v2.PreviewCardTrait
	SHORTCUTS_CARD_TRAIT = 119,
	VIDEO_PREVIEW_PLAYBACK_TRAIT = 120
}

export enum CacheStatus {
	UNKNOWN = 0,
	OK = 1,
	NOT_RESOLVED = 2,
	NOT_FOUND = 3,
	UNAVAILABLE_FOR_LEGAL_REASONS = 4
}

export class MetadataService {
	service: any;
	serviceDescriptor: any;

	public constructor() {
		const webpack = (window as any).webpackChunkclient_web ?? (window as any).webpackChunkopen;
		const require = webpack.push([[Symbol()], {}, (re: any) => re]);
		const cache = Object.keys(require.m).map(id => require(id));
		const modules = cache
			.filter(module => typeof module === "object")
			.map(module => {
				try {
					return Object.values(module);
				} catch {}
			})
			.flat();

		const metadataService = modules.filter(
			m =>
				m &&
				typeof m === "function" &&
				"SERVICE_ID" in m &&
				m.SERVICE_ID === "spotify.mdata_esperanto.proto.MetadataService"
		);
		const createTransport = modules.filter(
			m =>
				m &&
				typeof m === "function" &&
				m.toString().includes("executeEsperantoCall") &&
				m.toString().includes("cancelEsperantoCall")
		);

		if (metadataService.length !== 1) return;
		if (createTransport.length !== 1) return;

		this.serviceDescriptor = metadataService[0] as any;
		this.service = new this.serviceDescriptor((createTransport[0] as any)());
	}

	public fetch(kind: ExtensionKind, entityUri: string): Promise<{ typeUrl: string; value: Uint8Array }> {
		return new Promise((resolve, reject) => {
			const cancel = this.service.observe(
				this.serviceDescriptor.METHODS.observe.requestType.fromPartial({
					extensionQuery: [
						{
							entityUri: entityUri,
							extensionKind: kind
						}
					]
				}),
				(response: any) => {
					if (response.pendingResponse) return;
					cancel.cancel();

					const success = response.extensionResult[0].status === 1;
					if (!success) {
						const cacheStatus: CacheStatus = response.extensionResult[0].details.cacheStatus;
						reject(cacheStatus);
						return;
					}

					const data = response.extensionResult[0].extensionData;
                    resolve(data);
				}
			);
		});
	}
}
