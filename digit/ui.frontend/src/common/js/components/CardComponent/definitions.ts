export type CardComponentProps = {
  card1imagePath: string;
  card1title: string;
  card1description: string;
  card1CtaLabel: string;
  card1CtaPath: string;
  card2imagePath: string;
  card2title: string;
  card2description: string;
  card2CtaLabel: string;
  card2CtaPath: string;
  cardContainerList?: ThirdCardProps;
};

export type ThirdCardProps = {
  imagePath: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaPath: string;
};

export interface ImagePathProps {
  backgroundImageUrl?: string | null;
}
