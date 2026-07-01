import type { Episode, SEOContent } from "./types";
import { readEpisodes, writeEpisodes } from "./storage";
import {
  cleanYouTubeUrl,
  extractVideoId,
  fetchYouTubeMetadata,
  getThumbnailUrl,
  getWatchUrl,
} from "./youtube";

export async function getAllEpisodes(): Promise<Episode[]> {
  const data = await readEpisodes();
  return data.episodes.sort((a, b) => a.id - b.id);
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes();
  return episodes.find((ep) => ep.slug === slug) || null;
}

export async function getEpisodeById(id: number): Promise<Episode | null> {
  const episodes = await getAllEpisodes();
  return episodes.find((ep) => ep.id === id) || null;
}

export async function getAdjacentEpisodes(id: number) {
  const episodes = await getAllEpisodes();
  const index = episodes.findIndex((ep) => ep.id === id);
  return {
    prev: index > 0 ? episodes[index - 1] : null,
    next: index < episodes.length - 1 ? episodes[index + 1] : null,
  };
}

export async function updateEpisode(
  id: number,
  updates: Partial<Episode>
): Promise<Episode | null> {
  const data = await readEpisodes();
  const index = data.episodes.findIndex((ep) => ep.id === id);
  if (index === -1) return null;

  data.episodes[index] = { ...data.episodes[index], ...updates };
  await writeEpisodes(data);
  return data.episodes[index];
}

export async function addEpisode(
  youtubeUrl: string,
  seoContent?: Partial<SEOContent>
): Promise<Episode | null> {
  const videoId = extractVideoId(youtubeUrl);
  if (!videoId) return null;

  const data = await readEpisodes();
  const nextId =
    data.episodes.length > 0
      ? Math.max(...data.episodes.map((e) => e.id)) + 1
      : 1;

  const metadata = await fetchYouTubeMetadata(videoId);
  const title = metadata?.title || `Episode ${nextId}`;
  const slug = `episode-${nextId}`;

  const episode: Episode = {
    id: nextId,
    videoId,
    title,
    titleAr: `الحلقة ${nextId}`,
    description: generateShortDescription(title, nextId),
    descriptionAr: generateShortDescriptionAr(nextId),
    thumbnail: getThumbnailUrl(videoId),
    youtubeUrl: getWatchUrl(videoId),
    publishedAt: new Date().toISOString(),
    seoTitle: `Haya Qalbi Season 8 Episode ${nextId} - Full Analysis & Summary | حياة قلبي الجزء 8`,
    seoTitleAr: `حياة قلبي الجزء 8 الحلقة ${nextId} - ملخص وتحليل كامل`,
    seoDescription: `Watch and read the complete analysis of Haya Qalbi Season 8 Episode ${nextId}. Episode summary, character breakdown, hidden details, and theories. حياة قلبي الجزء الثامن.`,
    seoDescriptionAr: `شاهد واقرأ التحليل الكامل لحياة قلبي الجزء 8 الحلقة ${nextId}. ملخص الحلقة وتحليل الشخصيات والتفاصيل الخفية.`,
    seoContent: seoContent
      ? ({ ...generateDefaultSEOContent(nextId, title), ...seoContent } as SEOContent)
      : generateDefaultSEOContent(nextId, title),
    slug,
  };

  data.episodes.push(episode);
  await writeEpisodes(data);
  return episode;
}

export async function deleteEpisode(id: number): Promise<boolean> {
  const data = await readEpisodes();
  const index = data.episodes.findIndex((ep) => ep.id === id);
  if (index === -1) return false;
  data.episodes.splice(index, 1);
  await writeEpisodes(data);
  return true;
}

function generateShortDescription(title: string, id: number): string {
  return `Dive into Episode ${id} of Haya Qalbi Season 8. ${title} — complete analysis, character breakdown, and hidden details revealed.`;
}

function generateShortDescriptionAr(id: number): string {
  return `استكشف الحلقة ${id} من حياة قلبي الجزء الثامن. ملخص شامل وتحليل عميق للشخصيات والأحداث والتفاصيل الخفية.`;
}

export function generateDefaultSEOContent(
  episodeId: number,
  title: string
): SEOContent {
  return {
    summary: `Episode ${episodeId} of Haya Qalbi Season 8 opens with a tension that has been building across the entire season. ${title} delivers one of the most emotionally charged installments yet, weaving together threads of love, betrayal, and redemption that have defined this beloved drama series.

The episode begins in the aftermath of the previous cliffhanger, where unresolved conflicts between the main characters reach a boiling point. As viewers, we are immediately drawn into the emotional landscape of the story — every glance, every silence, and every word carries weight that resonates deeply with anyone who has followed this journey from the beginning.

Central to this episode is the evolving relationship between the protagonists. The writers masterfully balance moments of tenderness with scenes of confrontation, creating a narrative rhythm that keeps audiences on the edge of their seats. The cinematography deserves special mention — sweeping shots of Istanbul's iconic landscapes serve as a visual metaphor for the characters' internal struggles, while intimate close-ups capture the raw emotion that has made Haya Qalbi a global phenomenon.

One of the standout moments in Episode ${episodeId} involves a pivotal confrontation that forces each character to confront their deepest fears. The dialogue is sharp and purposeful, revealing layers of motivation that were previously hidden. Supporting characters also shine in this episode, with subplots that enrich the main narrative and provide context for the dramatic turns ahead.

The pacing of Episode ${episodeId} is deliberate yet engaging. Early scenes establish the emotional stakes, mid-episode sequences escalate the conflict, and the final act delivers revelations that will undoubtedly fuel discussions across social media and fan communities worldwide. The music score, a hallmark of Turkish drama excellence, underscores key moments with compositions that amplify the emotional impact without overwhelming the performances.

From an analytical perspective, Episode ${episodeId} represents a turning point in Season 8's narrative arc. Themes of forgiveness, family loyalty, and personal sacrifice are explored with nuance and depth. The episode also plants seeds for future developments, with subtle foreshadowing that attentive viewers will appreciate upon rewatching.

For SEO-focused readers searching for Haya Qalbi Season 8 content, this episode analysis provides comprehensive coverage of plot developments, character arcs, and thematic elements. Whether you're a longtime fan or a newcomer drawn in by word of mouth, this guide offers everything you need to fully appreciate the artistry and storytelling mastery on display.

The production quality continues to set a high bar for international drama. Costume design, set decoration, and lighting all contribute to an immersive viewing experience that transports audiences into the world of Haya Qalbi. Episode ${episodeId} is a testament to why this series has captured hearts across the Arabic-speaking world and beyond.

As we look ahead to the remaining episodes of Season 8, the events of Episode ${episodeId} will undoubtedly shape the trajectory of the finale. The stakes have never been higher, and the emotional investment of viewers has never been more justified. This is drama at its finest — compelling, beautiful, and unforgettable.`,
    summaryAr: `تبدأ الحلقة ${episodeId} من حياة قلبي الجزء الثامن بتوتر تراكم على مدار الموسم بأكمله. ${title} تقدم واحدة من أكثر الحلقات تأثيراً عاطفياً حتى الآن، حيث تنسج خيوط الحب والخيانة والتوبة التي عرّفت هذا المسلسل المحبوب.

تبدأ الحلقة في أعقاب الذروة الدرامية السابقة، حيث تصل الصراعات غير المحلولة بين الشخصيات الرئيسية إلى نقطة الغليان. نحن كمشاهدين نُ drawn فوراً إلى المشهد العاطفي للقصة — كل نظرة، كل صمت، وكل كلمة تحمل وزناً يتردد صداه بعمق مع كل من تابع هذه الرحلة منذ البداية.

محور هذه الحلقة هو العلاقة المتطورة بين البطل والبطلة. الكتاب يوازنون ببراعة بين لحظات الحنان ومشاهد المواجهة، مما يخلق إيقاعاً سردياً يبقي الجمهور على حافة مقاعدهم. التصوير السينمائي يستحق ذكراً خاصاً — اللقطات الواسعة لمناظر إسطنبول الأيقونية تعمل كاستعارة بصرية لصراعات الشخصيات الداخلية.

من أبرز لحظات الحلقة ${episodeId} مواجهة محورية تجبر كل شخصية على مواجهة مخاوفها العميقة. الحوار حاد وهادف، يكشف طبقات من الدوافع كانت مخفية سابقاً. الشخصيات الثانوية تتألق أيضاً في هذه الحلقة، بقصص فرعية تثري السرد الرئيسي.

من منظور تحليلي، تمثل الحلقة ${episodeId} نقطة تحول في القوس السردي للجزء 8. موضوعات المغفرة والولاء العائلي والتضحية الشخصية تُستكشف بعمق ودقة. الحلقة تزرع أيضاً بذوراً لتطورات مستقبلية، بتلميحات دقيقة سيقدّرها المشاهدون الم attentive عند إعادة المشاهدة.

جودة الإنتاج تواصل وضع معياراً عالياً للدراما الدولية. تصميم الأزياء والديكور والإضاءة كلها تساهم في تجربة مشاهدة غامرة. الحلقة ${episodeId} شهادة على سبب افتتان قلوب المشاهدين في العالم العربي وخارجه بهذا المسلسل.`,
    keyEvents: [
      `Opening scene sets the emotional tone with a dramatic confrontation between main characters`,
      `A secret from the past is revealed, shifting alliances among the supporting cast`,
      `The protagonist makes a difficult decision that will have lasting consequences`,
      `A tender moment between lovers provides emotional relief amid rising tension`,
      `A supporting character's subplot reaches a critical turning point`,
      `The episode ends with a cliffhanger that promises major developments in the next installment`,
      `Flashback sequences provide context for current character motivations`,
      `A family gathering scene exposes hidden tensions and unspoken grievances`,
    ],
    keyEventsAr: [
      `المشهد الافتتاحي يضبط النبرة العاطفية بمواجهة درامية بين الشخصيات الرئيسية`,
      `يُكشف سر من الماضي، مما يغيّر التحالفات بين طاقم الممثلين الثانوي`,
      `يتخذ البطل قراراً صعباً سيكون له عواقب دائمة`,
      `لحظة حنونة بين العاشقين توفر راحة عاطفية وسط التوتر المتصاعد`,
      `تصل القصة الفرعية لشخصية ثانوية إلى نقطة تحول حاسمة`,
      `تنتهي الحلقة بذروة مشوقة تعد بتطورات كبيرة في الحلقة القادمة`,
      `تsequences الفلاش باك توفر سياقاً لدوافع الشخصيات الحالية`,
      `مشهد تجمع عائلي يكشف توترات مخفية وشكاوى غير م expressed`,
    ],
    characterAnalysis: `Episode ${episodeId} offers rich character development across the ensemble cast. The protagonist displays a remarkable evolution — moving from reactive emotional responses to deliberate, measured actions that reflect growing maturity. Their internal conflict between duty and desire is portrayed with exceptional subtlety, making them one of the most compelling leads in contemporary drama.

The antagonist, far from being one-dimensional, reveals vulnerabilities that humanize their actions. This episode peels back layers of their backstory, showing how past trauma shaped their current motivations. The performance is nuanced, avoiding caricature in favor of psychological complexity.

Supporting characters receive meaningful screen time that advances both their individual arcs and the main plot. The best friend character serves as an emotional anchor, providing comic relief without undermining the drama's gravity. The family matriarch's scenes are particularly powerful, embodying themes of tradition versus modernity that run throughout the series.

Character relationships are tested and transformed in Episode ${episodeId}. Trust is broken and rebuilt, alliances shift, and new connections form in unexpected ways. The writers excel at showing rather than telling — character growth is communicated through actions, expressions, and choices rather than exposition.`,
    characterAnalysisAr: `تقدم الحلقة ${episodeId} تطوراً غنياً للشخصيات عبر طاقم التمثيل. يظهر البطل تطوراً ملحوظاً — من الاستجابات العاطفية التفاعلية إلى أفعال مدروسة ومتزنة تعكس نضجاً متزايداً. صراعه الداخلي بين الواجب والرغبة يُportrayed بلطف استثنائي.

الخصم، بعيداً عن كونه أحادي البعد، يكشف نقاط ضعف تُhumanize أفعاله. هذه الحلقة تكشف طبقات من ماضيه، موضحة كيف شكّلت الصدمات السابقة دوافعه الحالية. الأداء nuanced، يتجنب الكاريكاتور لصالح التعقيد النفسي.

الشخصيات الثانوية تحصل على وقت شاشة meaningful ي advance كل من arcs الفردية والحبكة الرئيسية. شخصية أفضل صديق تعمل كمرساة عاطفية. مشاهد matriarch العائلة قوية بشكل خاص، تجسد موضوعات التقاليد مقابل الحداثة.

العلاقات بين الشخصيات تُختبر وتتحول في الحلقة ${episodeId}. الثقة تُكسر وتُ rebuilt، التحالفات تتغير، وconnections جديدة تتشكل بطرق unexpected.`,
    sceneExplanation: `The opening sequence of Episode ${episodeId} is a masterclass in visual storytelling. Shot during golden hour, the warm light contrasts sharply with the cold dialogue exchanged between characters, creating a visual dissonance that mirrors their emotional state. The director uses long takes and minimal cuts to build tension organically.

The confrontation scene in the middle act is structured as a three-act play within the episode. It begins with polite civility, escalates through accusation and defense, and culminates in a moment of devastating honesty. The blocking — who stands, who sits, who turns away — communicates power dynamics without a single word of exposition.

A quieter scene featuring two characters sharing a meal is deceptively simple. The camera lingers on hands, plates, and glances, building intimacy through mundane details. This scene serves as the emotional heart of the episode, reminding viewers that the greatest drama often lives in the smallest moments.

The closing sequence employs a technique common in premium drama — a slow pull-back shot that reveals the broader context of the characters' isolation. Combined with a swelling musical score, it creates a sense of epic scope that elevates the personal story to universal themes.`,
    sceneExplanationAr: `تسلسل الافتتاح في الحلقة ${episodeId} درس magister في السرد البصري. مُصوّر خلال الساعة الذهبية، الضوء الدافئ يتناقض ب sharpness مع الحوار البارد المتبادل بين الشخصيات. المخرج يستخدم لقطات طويلة وcuts minimal لبناء التوتر organically.

مشهد المواجهة في الفصل الأوسط مُstructured كمسرحية ثلاثية فصول داخل الحلقة. يبدأ بأدب مهذب، ي escalate عبر الاتهام والدفاع، و culminates في لحظة صدق مدمرة. blocking — من يقف، من يجلس، من يت away — ي communicate dynamics القوة.

مشهد أهدأ featuring شخصيتين يت sharing وجبة deceptively بسيط. الكamera ت linger على الأيدي والأطباق وال glances، تبني intimacy عبر تفاصيل mundane. هذا المشهد ي serve ك emotional قلب الحلقة.

تسلسل الختام ي employ تقنية common في الدراما premium — لقطة pull-back بطيئة ت reveal broader سياق ع isolation الشخصيات.`,
    hiddenDetails: `Attentive viewers will notice several Easter eggs and foreshadowing elements in Episode ${episodeId}. Background props in key scenes contain visual references to events from earlier seasons, rewarding dedicated fans with layers of meaning. The color palette shifts subtly throughout the episode — warm tones dominate scenes of connection while cool blues appear during moments of conflict and isolation.

A recurring motif of mirrors and reflections appears in three separate scenes, symbolizing the characters' struggle with self-identity and the gap between public persona and private truth. The costume choices also tell a story — one character's shift from dark to light clothing mirrors their emotional journey within the episode.

Eagle-eyed viewers spotted a photograph in the background of a key scene that features characters who haven't appeared since Season 6, sparking theories about their potential return. The episode's title, when translated, contains a double meaning that only becomes apparent in the final scene.

Social media has already generated numerous fan theories based on Episode ${episodeId}, including speculation about a major character's true allegiance and predictions about how the season's central mystery will be resolved.`,
    hiddenDetailsAr: `المشاهدون attentive سيلاحظون several Easter eggs وعناصر foreshadowing في الحلقة ${episodeId}. props الخلفية في مشاهد key تحتوي visual references لأحداث من seasons سابقة. palette الألوان ي shift subtly — tones دافئة dominate مشاهد connection بينما blues باردة appear خلال moments conflict.

motif متكرر من mirrors و reflections ي appear في three مشاهد separate، symbolizing struggle الشخصيات مع self-identity. costume choices أيضاً tell story — shift شخصية من dark إلى light clothing mirrors رحلتهم emotional.

viewers eagle-eyed spotted photograph في background مشهد key features شخصيات لم appear منذ Season 6، sparking theories عن potential return. title الحلقة، عند translation، contains double meaning ي become apparent في المشهد final.

social media already generated numerous theories بناءً على الحلقة ${episodeId}.`,
    emotionalHighlights: `Episode ${episodeId} delivers multiple emotional peaks that have left viewers reaching for tissues. The reunion scene between estranged family members is performed with such authenticity that it transcends language barriers — a testament to the universal power of great acting. The moment when the protagonist whispers words of forgiveness is particularly devastating, rendered in a close-up that captures every micro-expression.

The episode's emotional range is impressive — from gut-wrenching sorrow to moments of unexpected joy and laughter. A scene where children play unaware of the adult turmoil around them serves as a poignant reminder of innocence in a world of complexity. The romantic subplot reaches a beautiful crescendo before being interrupted by external forces, leaving viewers emotionally invested in the outcome.

Music plays a crucial role in amplifying these emotional beats. The score composer uses leitmotifs associated with each character, so when two themes merge during a key scene, the emotional impact is multiplied. By the episode's end, viewers report feeling emotionally exhausted in the best possible way — the hallmark of truly great drama.`,
    emotionalHighlightsAr: `الحلقة ${episodeId} ت deliver multiple peaks عاطفية تركت viewers ي reach لل tissues. مشهد reunion بين family members من estranged مُ performed ب authenticity such أنه transcends language barriers. moment عندما protagonist whispers كلمات forgiveness particularly devastating.

emotional range الحلقة impressive — من sorrow gut-wrenching إلى moments joy و laughter unexpected. مشهد children play unaware من adult turmoil serves ك reminder poignant من innocence. romantic subplot reaches crescendo beautiful قبل interrupted ب forces external.

music يلعب role crucial في amplifying beats عاطفية. score composer uses leitmotifs associated بكل character. بنهاية الحلقة، viewers report feeling emotionally exhausted في best way possible — hallmark drama truly great.`,
    faq: [
      {
        question: `What happens in Haya Qalbi Season 8 Episode ${episodeId}?`,
        questionAr: `ماذا يحدث في حياة قلبي الجزء 8 الحلقة ${episodeId}؟`,
        answer: `Episode ${episodeId} features major plot developments including character confrontations, revealed secrets, and emotional turning points that advance the Season 8 narrative arc significantly.`,
        answerAr: `الحلقة ${episodeId} تتضمن تطورات حبكة رئيسية تشمل مواجهات شخصيات وأسرار مكشوفة ونقاط تحول عاطفية ت advance القوس السردي للجزء 8 significantly.`,
      },
      {
        question: `Where can I watch Haya Qalbi Season 8 Episode ${episodeId}?`,
        questionAr: `أين يمكنني مشاهدة حياة قلبي الجزء 8 الحلقة ${episodeId}؟`,
        answer: `You can watch Episode ${episodeId} embedded on this page via the official YouTube player, or click "Watch on YouTube" to view it directly on YouTube.`,
        answerAr: `يمكنك مشاهدة الحلقة ${episodeId} embedded في هذه الصفحة عبر YouTube player الرسمي، أو انقر "Watch on YouTube" للمشاهدة مباشرة على YouTube.`,
      },
      {
        question: `Is Episode ${episodeId} available with Arabic subtitles?`,
        questionAr: `هل الحلقة ${episodeId} متاحة بترجمة عربية؟`,
        answer: `The YouTube embed supports subtitle options. Click the CC button on the video player to check available subtitle languages including Arabic.`,
        answerAr: `YouTube embed يدعم subtitle options. انقر CC button على video player للتحقق من subtitle languages المتاحة including Arabic.`,
      },
      {
        question: `What are the main themes in Episode ${episodeId}?`,
        questionAr: `ما هي الموضوعات الرئيسية في الحلقة ${episodeId}؟`,
        answer: `Key themes include love versus duty, family loyalty, forgiveness, personal sacrifice, and the struggle between tradition and modernity.`,
        answerAr: `الموضوعات key تشمل love versus duty، family loyalty، forgiveness، personal sacrifice، وال struggle بين tradition و modernity.`,
      },
      {
        question: `How does Episode ${episodeId} connect to previous episodes?`,
        questionAr: `كيف ترتبط الحلقة ${episodeId} بالحلقات السابقة؟`,
        answer: `Episode ${episodeId} directly continues storylines from Episode ${episodeId - 1 || 1}, resolving some cliffhangers while introducing new conflicts. Flashback scenes provide context from earlier seasons.`,
        answerAr: `الحلقة ${episodeId} directly continue storylines من الحلقة السابقة، resolving cliffhangers بينما introducing conflicts جديدة.`,
      },
      {
        question: `Who are the main characters featured in Episode ${episodeId}?`,
        questionAr: `من هم الشخصيات الرئيسية في الحلقة ${episodeId}؟`,
        answer: `The episode focuses on the core cast including the protagonist couple, family matriarch, best friend, and the season's primary antagonist, with meaningful appearances from supporting characters.`,
        answerAr: `الحلقة focus على core cast including protagonist couple، family matriarch، best friend، و antagonist primary للموسم.`,
      },
      {
        question: `Will there be more episodes after Episode ${episodeId}?`,
        questionAr: `هل ستكون هناك حلقات أكثر بعد الحلقة ${episodeId}؟`,
        answer: `Yes, Season 8 continues with additional episodes. Check our homepage for the complete episode list and latest additions.`,
        answerAr: `نعم، الجزء 8 continues مع حلقات additional. تحقق من homepage ل complete episode list.`,
      },
      {
        question: `Is this episode analysis spoiler-free?`,
        questionAr: `هل هذا التحليل خالٍ من spoilers؟`,
        answer: `This analysis contains detailed plot discussion and is best read after watching the episode. We recommend watching first, then reading for deeper insights.`,
        answerAr: `هذا analysis contains detailed plot discussion و is best read بعد مشاهدة الحلقة. نوصي بالمشاهدة أولاً.`,
      },
    ],
  };
}

export { cleanYouTubeUrl, extractVideoId };
