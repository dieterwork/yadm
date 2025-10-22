import { create } from "zustand";
import { temporal } from "zundo";
import {
  addEdge as _addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type ReactFlowInstance,
  reconnectEdge,
  type OnReconnect,
  type FinalConnectionState,
  type HandleType,
  Position,
  isEdge,
  isNode,
} from "@xyflow/react";

import { initialNodes } from "../nodes/initialNodes";
import { initialEdges } from "../edges/initialEdges";
import type { DEMONode, DEMOHandle, NodeScope } from "../nodes/nodes.types";
import uuid from "../../shared/utils/uuid";
import type { DEMOEdge } from "../edges/edges.types";
import getEdgeType from "./utils/getEdgeType";
import getMarkerType from "./utils/getMarkerType";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";
import getEdgeData from "./utils/getEdgeData";
import { sortNodes } from "$/shared/utils/sortNodes";
import throttle from "$/shared/utils/throttle";
import { updateHelperLines } from "../helper_lines/useHelperLinesStore";
import type { CooperationModelNode } from "../nodes/cooperation_model/cooperationModel.types";
import formatDate from "$/shared/utils/formatDate";

type DEMOLanguage = "en" | "fr" | "nl-be";
export interface DEMOModelerState {
  lang: DEMOLanguage;
}

export const useI18NStore = create<DEMOModelerState>()(
  temporal((set, get) => ({
    lang: "en",
  }))
);

export const changeLanguage = (lang: DEMOLanguage) => {
  useI18NStore.setState(() => ({
    lang,
  }));
};
