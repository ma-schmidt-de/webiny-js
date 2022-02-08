import get from "lodash/get";
import Error from "@webiny/error";
import { ApwOnBeforePagePublishTopicParams } from "~/types";
import { InitiateContentReviewParams } from ".";

export default ({ pageBuilder }: InitiateContentReviewParams) => {
    pageBuilder.onBeforePagePublish.subscribe<ApwOnBeforePagePublishTopicParams>(
        async ({ page }) => {
            const contentReviewId = get(page, "settings.apw.contentReviewId");
            if (contentReviewId) {
                throw new Error(
                    `A peer review for this content has been already requested.`,
                    "REVIEW_ALREADY_EXIST",
                    {
                        contentReviewId,
                        page
                    }
                );
            }

            const workflowId = get(page, "settings.apw.workflowId");

            if (workflowId) {
                throw new Error(
                    "This content requires peer review approval before it can be published.",
                    "REVIEW_REQUIRED",
                    {
                        workflowId,
                        page
                    }
                );
            }
        }
    );
};
