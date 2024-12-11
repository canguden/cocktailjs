"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconsSetup = void 0;
exports.iconsSetup = {
    files: {
        'src/components/icons.tsx': `
import { type Icon as LucideIcon } from 'lucide-react';
import { 
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Command,
  FileText,
  Github,
  Globe,
  HelpCircle,
  Image,
  Laptop,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
} from 'lucide-react';
import * as ReactIcons from 'react-icons/all';
import * as Heroicons from '@heroicons/react/24/outline';

export type IconProps = React.ComponentProps<LucideIcon>;

export const Icons = {
  logo: Command,
  close: X,
  spinner: Command,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertCircle,
  user: User,
  arrowRight: ChevronRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: Github,
  twitter: Twitter,
  check: CheckCircle2,
  globe: Globe,
  // Add more icons as needed
} as const;

export type IconKeys = keyof typeof Icons;
`
    },
    envVars: {},
    dependencies: {}
};
