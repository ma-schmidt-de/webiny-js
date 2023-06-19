import * as React from "react";
import { css } from "emotion";
import { Image } from "@webiny/app/components";
import { EditAction } from "./EditAction";
import { FileManagerFileTypePlugin } from "~/FileManagerFileTypePlugin";

const styles = css({
    width: "auto"
    // maxHeight: 200,
    // maxWidth: 200,
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translateX(-50%) translateY(-50%)"
});

export const imageFileTypePlugin = new FileManagerFileTypePlugin({
    types: ["image/*"],
    actions: [EditAction],
    render({ file, width }) {
        return (
            <Image
                className={styles}
                src={file.src}
                alt={file.name}
                transform={{ width: width ?? 300 }}
            />
        );
    }
});
