"use client";

import { useEffect } from "react";
import { trackMetrikaGoal, type MetrikaParams } from "@/lib/analytics";

type MetrikaGoalProps = {
  goal: string;
  params?: MetrikaParams;
};

export function MetrikaGoal({ goal, params }: MetrikaGoalProps): null {
  useEffect(() => {
    trackMetrikaGoal(goal, params);
  }, [goal, params]);

  return null;
}
