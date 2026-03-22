import { getHomepage, getCourseImageUrl } from "@/lib/strapi";
import HeroSection from "@/components/sections/HeroSection";
import EmpoweringYouthSection from "@/components/sections/EmpoweringYouthSection";
import ValuesSection from "@/components/sections/ValuesSection";
import TimelineSection from "@/components/sections/TimelineSection";
import TrainingSection from "@/components/sections/TrainingSection";
import ResultsSection from "@/components/sections/ResultsSection";
import VisionSection from "@/components/sections/VisionSection";
import CTASection from "@/components/sections/CTASection";

export default async function HomePage() {
  const hp = await getHomepage();

  const resultsBackgroundUrl = hp.resultsBackground
    ? getCourseImageUrl(hp.resultsBackground)
    : undefined;

  const aboutPhotoUrls = hp.aboutPhotos?.map((p) => ({
    url: getCourseImageUrl(p),
    alt: p.alternativeText ?? '',
  }));

  const heroImageUrl = hp.heroImage ? getCourseImageUrl(hp.heroImage) : undefined;

  return (
    <>
      <HeroSection
        title={hp.heroTitle}
        subtitle={hp.heroSubtitle}
        backgroundImage={heroImageUrl}
        buttons={hp.heroButtons}
      />
      <EmpoweringYouthSection
        heading={hp.aboutHeading}
        body={hp.aboutBody}
        mission={hp.aboutMission}
        vision={hp.aboutVision}
        photos={aboutPhotoUrls}
      />
      <ValuesSection values={hp.values} />
      <TimelineSection
        title={hp.timelineTitle}
        subtitle={hp.timelineSubtitle}
        milestones={hp.timelineMilestones}
      />
      <TrainingSection
        title={hp.trainingTitle}
        subtitle={hp.trainingSubtitle}
        modules={hp.trainingModules}
      />
      <ResultsSection
        stats={hp.stats}
        resultCards={hp.resultCards}
        backgroundImage={resultsBackgroundUrl}
        title={[hp.resultsTitleLine1, hp.resultsTitleLine2]}
        subtitle={hp.resultsSubtitle}
      />
      <VisionSection
        title={hp.visionTitle}
        subtitle={hp.visionSubtitle}
        initiatives={hp.visionInitiatives}
      />
      <CTASection
        heading1={hp.ctaHeading1}
        heading2={hp.ctaHeading2}
        body={hp.ctaBody}
        buttons={hp.ctaButtons}
      />
    </>
  );
}
