import type { ComponentProps } from 'react';
import { boardFiles } from '../../../models/showcase/board.model';
import { boardCode } from '../../../models/showcase/boardCode.model';
import { BrowserBoard } from './BrowserBoard';
import { CodeEditor } from './CodeEditor';
import { DesignFrame } from './DesignFrame';
import { Window, WindowLights, WindowTab, WindowUrl } from './Window';

export function DesignWindow({ active }: { active: boolean }) {
  const bar = (
    <>
      <WindowLights />
      <WindowTab>{boardFiles.design}</WindowTab>
    </>
  );

  return (
    <Window className="showcase__layer showcase__design" active={active} depth={6} bar={bar}>
      <DesignFrame active={active} />
    </Window>
  );
}

type CodeWindowProps = Omit<ComponentProps<typeof CodeEditor>, 'rows'> & { active: boolean };

export function CodeWindow({ active, ...code }: CodeWindowProps) {
  return (
    <Window
      className="showcase__layer showcase__code"
      active={active}
      depth={14}
      variant="code"
      bar={<WindowTab>{boardFiles.code}</WindowTab>}
    >
      <CodeEditor rows={boardCode.length} {...code} />
    </Window>
  );
}

type BrowserWindowProps = ComponentProps<typeof BrowserBoard> & { active: boolean; reloading: boolean };

export function BrowserWindow({ active, reloading, ...board }: BrowserWindowProps) {
  const bar = (
    <>
      <WindowLights />
      <WindowUrl url={boardFiles.url} reloadKey={Math.min(board.reveal, 99)} reloading={reloading} />
    </>
  );

  return (
    <Window className="showcase__layer showcase__browser" active={active} depth={22} bar={bar}>
      <BrowserBoard {...board} />
    </Window>
  );
}
