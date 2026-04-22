import { getHomepage, getCourses, getCourseImageUrl, getAlbums } from "@/lib/strapi";
import HeroSection from "@/components/sections/HeroSection";
import EmpoweringYouthSection from "@/components/sections/EmpoweringYouthSection";
import ValuesSection from "@/components/sections/ValuesSection";
import TimelineSection from "@/components/sections/TimelineSection";
import TrainingSection from "@/components/sections/TrainingSection";
import ResultsSection from "@/components/sections/ResultsSection";
import VisionSection from "@/components/sections/VisionSection";
import CoursesSection from "@/components/sections/CoursesSection";
import GalleryPreviewSection from "@/components/sections/GalleryPreviewSection";
import CTASection from "@/components/sections/CTASection";

export default async function HomePage() {
   const [hp, courses, albums] = await Promise.all([getHomepage(), getCourses(), getAlbums().catch(() => [])]);

   const resultsBackgroundUrl = hp.resultsBackground ? getCourseImageUrl(hp.resultsBackground) : undefined;

   const aboutPhotoUrls = hp.aboutPhotos?.map((p) => ({
      url: getCourseImageUrl(p),
      alt: p.alternativeText ?? "",
   }));

   const heroMedia = Array.isArray(hp.heroImage) ? hp.heroImage[0] : hp.heroImage;
   const heroImageUrl = heroMedia ? getCourseImageUrl(heroMedia) : undefined;
   const heroIsVideo = heroMedia?.mime?.startsWith('video/') ?? false;

   return (
      <>
         <HeroSection
            title={hp.heroTitle ?? ""}
            subtitle={hp.heroSubtitle}
            backgroundImage={heroImageUrl}
            backgroundIsVideo={heroIsVideo}
            buttons={hp.heroButtons ?? []}
         />
         <EmpoweringYouthSection
            heading={hp.aboutHeading}
            body={hp.aboutBody}
            mission={hp.aboutMission}
            vision={hp.aboutVision}
            photos={aboutPhotoUrls}
            missionLabel={hp.missionLabel}
            visionLabel={hp.visionLabel}
         />
         <ValuesSection values={hp.values ?? []} />
         <TimelineSection
            title={hp.timelineTitle}
            subtitle={hp.timelineSubtitle}
            milestones={hp.timelineMilestones ?? []}
         />
         <TrainingSection title={hp.trainingTitle} subtitle={hp.trainingSubtitle} modules={hp.trainingModules ?? []} />
         <ResultsSection
            stats={hp.stats ?? []}
            resultCards={hp.resultCards ?? []}
            backgroundImage={resultsBackgroundUrl}
            title={[hp.resultsTitleLine1 ?? "", hp.resultsTitleLine2 ?? ""]}
            subtitle={hp.resultsSubtitle}
         />
         <VisionSection 
            title={hp.visionTitle} 
            subtitle={hp.visionSubtitle} 
            initiatives={hp.visionInitiatives ?? []} 
         />         
         <CoursesSection
            courses={courses.map((c) => ({ ...c, imageUrl: getCourseImageUrl(c.image) }))}
         />
         <GalleryPreviewSection albums={albums} />
         <CTASection
            heading1={hp.ctaHeading1}
            heading2={hp.ctaHeading2}
            body={hp.ctaBody}
            buttons={hp.ctaButtons ?? []}
         />
      </>
   );
}
