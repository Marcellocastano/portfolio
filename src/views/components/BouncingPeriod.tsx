import { useBounceOnHover } from '../../controllers/useBounceOnHover';
import './BouncingPeriod.css';

export function BouncingPeriod() {
  const { bouncing, hoverProps, onAnimationIteration } = useBounceOnHover();

  return (
    <span className="bouncing-period" aria-hidden="true" {...hoverProps}>
      <span className="bouncing-period__dot" data-bouncing={bouncing} onAnimationIteration={onAnimationIteration}>
        .
      </span>
    </span>
  );
}
