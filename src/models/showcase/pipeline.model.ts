import { i18n } from '../i18n.model';
import { boardFiles } from './board.model';
import type { ShowcaseStage } from './timeline.model';

export const stageInfo: Record<ShowcaseStage, { label: string; output: string }> = {
  design: { label: i18n.showcase.stages.design, output: boardFiles.design },
  code: { label: i18n.showcase.stages.code, output: boardFiles.code },
  browser: { label: i18n.showcase.stages.browser, output: boardFiles.url },
};
