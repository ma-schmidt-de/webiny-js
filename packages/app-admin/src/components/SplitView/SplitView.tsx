import * as React from "react";
import classSet from "classnames";
import { Cell, Grid, CellProps } from "@webiny/ui/Grid";
import { css } from "emotion";
import styled from "@emotion/styled";
import clone from "lodash/clone";
import { getClasses } from "@webiny/ui/Helpers";

const grid = css({
    "&.mdc-layout-grid": {
        padding: 0,
        margin: "-3px auto 0 auto",
        backgroundColor: "var(--mdc-theme-background)",
        ">.mdc-layout-grid__inner": {
            gridGap: 0
        }
    }
});

const RightPanelWrapper = styled("div")({
    backgroundColor: "var(--mdc-theme-background)",
    overflow: "auto",
    height: "calc(100vh - 64px)"
});

export const leftPanel = css({
    backgroundColor: "var(--mdc-theme-surface)",
    ">.webiny-data-list": {
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 70px)",
        ".mdc-deprecated-list": {
            overflow: "auto"
        }
    },
    ">.mdc-deprecated-list": {
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100vh - 64px)",
        overflow: "auto"
    }
});

interface SplitViewProps {
    children: React.ReactElement<any> | React.ReactElement<any>[];
    className?: string;
}

const SplitView = (props: SplitViewProps) => {
    return (
        <Grid className={classSet(grid, props.className, "webiny-split-view")}>
            {props.children}
        </Grid>
    );
};

const LeftPanel = (props: CellProps) => {
    const propList = clone(props);
    if (!propList.hasOwnProperty("span")) {
        propList.span = 5;
    }

    return (
        <Cell
            {...getClasses(
                propList,
                classSet(leftPanel, props.className, "webiny-split-view__left-panel")
            )}
        >
            {propList.children}
        </Cell>
    );
};

const RightPanel = (props: CellProps) => {
    const propList = clone(props);
    if (!propList.hasOwnProperty("span")) {
        propList.span = 7;
    }

    return (
        <Cell {...getClasses(propList, "webiny-split-view__right-panel")}>
            <RightPanelWrapper
                className={"webiny-split-view__right-panel-wrapper"}
                id={"webiny-split-view-right-panel"}
            >
                {propList.children}
            </RightPanelWrapper>
        </Cell>
    );
};

export { SplitView, LeftPanel, RightPanel };
