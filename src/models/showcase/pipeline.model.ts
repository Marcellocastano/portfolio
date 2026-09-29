import { boardFiles } from './board.model';
import type { ShowcaseStage } from './timeline.model';

export const stageInfo: Record<ShowcaseStage, { label: string; output: string }> = {
  design: { label: 'Design', output: boardFiles.design },
  code: { label: 'Code', output: boardFiles.code },
  browser: { label: 'Browser', output: boardFiles.url },
};
