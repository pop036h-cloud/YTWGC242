"use client";

import { useState } from "react";
import {
  BookOpen,
  Users,
  Eye,
  Sparkles,
  Heart,
  HelpCircle,
  List,
  Globe,
} from "lucide-react";
import type { Episode } from "@/lib/types";

interface SEOContentProps {
  episode: Episode;
}

export default function SEOContentSection({ episode }: SEOContentProps) {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const content = episode.seoContent;
  const isAr = lang === "ar";

  const sections = [
    {
      icon: BookOpen,
      title: isAr ? "ملخص الحلقة" : "Episode Summary",
      content: isAr ? content.summaryAr : content.summary,
    },
    {
      icon: List,
      title: isAr ? "الأحداث الرئيسية" : "Key Events Breakdown",
      content: isAr ? content.keyEventsAr : content.keyEvents,
      isList: true,
    },
    {
      icon: Users,
      title: isAr ? "تحليل الشخصيات" : "Character Analysis",
      content: isAr ? content.characterAnalysisAr : content.characterAnalysis,
    },
    {
      icon: Eye,
      title: isAr ? "شرح المشاهد" : "Scene Explanation",
      content: isAr ? content.sceneExplanation : content.sceneExplanation,
    },
    {
      icon: Sparkles,
      title: isAr ? "تفاصيل خفية ونظريات" : "Hidden Details & Theories",
      content: isAr ? content.hiddenDetails : content.hiddenDetails,
    },
    {
      icon: Heart,
      title: isAr ? "أبرز اللحظات العاطفية" : "Emotional Highlights",
      content: isAr ? content.emotionalHighlights : content.emotionalHighlights,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {isAr ? "تحليل الحلقة" : "Episode Analysis"}
        </h2>
        <button
          onClick={() => setLang(isAr ? "en" : "ar")}
          className="flex items-center gap-2 text-sm bg-card border border-border px-4 py-2 rounded-lg hover:bg-card-hover transition-colors"
        >
          <Globe className="w-4 h-4" />
          {isAr ? "English" : "العربية"}
        </button>
      </div>

      <div dir={isAr ? "rtl" : "ltr"} className="space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="prose-content">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <section.icon className="w-5 h-5 text-accent" />
              </div>
              <h2>{section.title}</h2>
            </div>

            {section.isList ? (
              <ul>
                {(section.content as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              (section.content as string)
                .split("\n\n")
                .map((paragraph, i) => <p key={i}>{paragraph}</p>)
            )}
          </section>
        ))}

        <section className="prose-content">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-accent" />
            </div>
            <h2>{isAr ? "أسئلة شائعة" : "Frequently Asked Questions"}</h2>
          </div>

          <div className="space-y-4">
            {content.faq.map((item, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-lg overflow-hidden"
              >
                <summary className="cursor-pointer px-5 py-4 font-medium hover:bg-card-hover transition-colors list-none flex items-center justify-between">
                  {isAr ? item.questionAr : item.question}
                  <span className="text-accent text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-4 text-muted leading-relaxed">
                  {isAr ? item.answerAr : item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
