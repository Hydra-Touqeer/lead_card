export interface ActivityTag {
  label: string;
  dotColor: string;
  dropdown?: boolean;
}

export interface ActivityMetaSegment {
  text: string;
  emphasis?: boolean;
}

export interface ActivityItem {
  title: string;
  timestamp?: string;
  tags?: ActivityTag[];
  description?: string;
  meta?: ActivityMetaSegment[];
}

export interface ActivityGroup {
  label?: string;
  items: ActivityItem[];
}
