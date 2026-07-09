import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import DEMOElementToolbar from "$/shared/components/ui/element_toolbar/DEMOElementToolbar";
import DEMOElementToolbarGroup from "$/shared/components/ui/element_toolbar/DEMOElementToolbarGroup";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarSeparator from "$/shared/components/ui/element_toolbar/DEMOElementToolbarSeparator";
import {
  updateEdgeData,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import { useTranslation } from "react-i18next";
import type { ObjectFactDiagramEdge } from "../edges.types";
import CardinalityLabelPortal from "./CardinalityLabelPortal";
import { cn } from "tailwind-variants";
import type { CSSProperties, HTMLAttributes } from "react";
import { getCardinalityLabelToolbarTransform } from "./getCardinalityLabelToolbarTransform";
import { Position, type Align, type XYPosition } from "@xyflow/react";

export type CardinalityLabelToolbarProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * By passing in an array of edge id's you can render a single tooltip for a group or collection
   * of edges.
   */
  edgeId?: string;
  /** If `true`, edge toolbar is visible even if edge is not selected. */
  isVisible?: boolean;
  /**
   * Position of the toolbar relative to the edge.
   * @default Position.Top
   * @example Position.TopLeft, Position.TopRight, Position.BottomLeft, Position.BottomRight
   */
  position?: Position;
  /**
   * The space between the edge and the toolbar, measured in pixels.
   * @default 10
   */
  offset?: number;
  /**
   * Align the toolbar relative to the edge.
   * @default "center"
   * @example Align.Start, Align.Center, Align.End
   */
  align?: Align;
  xyPosition?: XYPosition;
  onEdit?: () => void;
  onClose?: () => void;
  onDelete?: () => void;
  labelField?: string;
};

const CardinalityLabelToolbar = ({
  edgeId,
  className,
  style,
  isVisible,
  position = Position.Top,
  offset = 10,
  align = "center",
  xyPosition,
  onEdit,
  onClose,
  onDelete,
  labelField,
  ...restProps
}: CardinalityLabelToolbarProps) => {
  const { t } = useTranslation();

  xyPosition = xyPosition ?? { x: 0, y: 0 };
  const viewport = useDEMOModelerStore((state) => state.viewport);
  const { x, y, zoom } = viewport;

  const edges = useDEMOModelerStore((state) => {
    return state.edges;
  });

  const isActive = isVisible;

  if (!isActive) {
    return null;
  }

  const zIndex = Math.max(...edges.map((edge) => (edge?.zIndex ?? 0) + 1));

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    transform: getCardinalityLabelToolbarTransform(
      xyPosition,
      { x, y, zoom },
      position,
      offset,
      align,
    ),
    zIndex,
    ...style,
  };

  return (
    <CardinalityLabelPortal>
      <div
        {...restProps}
        style={wrapperStyle}
        className={cn("react-flow__cardinality-label-toolbar", className)}
      >
        <DEMOElementToolbar>
          <DEMOElementToolbarGroup aria-label={t(($) => $["Edit"])}>
            <DEMOElementToolbarButton
              icon={(iconProps) => <PencilSimpleIcon {...iconProps} />}
              label={t(($) => $["Edit text"])}
              onPress={() => {
                onEdit?.();
                onClose?.();
              }}
            />
          </DEMOElementToolbarGroup>
          <DEMOElementToolbarSeparator />
          <DEMOElementToolbarGroup aria-label={t(($) => $["Danger zone"])}>
            <DEMOElementToolbarButton
              icon={(iconProps) => <TrashIcon {...iconProps} />}
              label={t(($) => $["Delete"])}
              state="danger"
              onPress={() => {
                onClose?.();
                onDelete?.();
              }}
            />
          </DEMOElementToolbarGroup>
        </DEMOElementToolbar>
      </div>
    </CardinalityLabelPortal>
  );
};

export default CardinalityLabelToolbar;
