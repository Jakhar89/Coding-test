import { APIType } from '@/context/Analytics/definitions';
type AnnouncementType = 'error' | 'info' | 'success' | 'warning';

export type InPageAnnouncementProps = {
  announcementType?: AnnouncementType;
  heading?: string;
  shouldNotApplyScrollIntoViewBehavior?: boolean;
  text: string;
};
