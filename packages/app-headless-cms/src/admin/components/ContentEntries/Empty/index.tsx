import React from "react";
import { ReactComponent as SearchIcon } from "@material-design-icons/svg/outlined/search.svg";
import EmptyView from "@webiny/app-admin/components/EmptyView";
import { i18n } from "@webiny/app/i18n";
import { ButtonDefault } from "@webiny/ui/Button";
import { Buttons, Icon } from "./styled";

const t = i18n.ns("app-headless-cms/admin/components/content-entries/empty");

interface Props {
    isSearch: boolean;
    onCreateEntry: (event: React.SyntheticEvent) => void;
    onCreateFolder: (event: React.SyntheticEvent) => void;
    canCreate: boolean;
}

export const Empty: React.VFC<Props> = ({ isSearch, onCreateEntry, onCreateFolder, canCreate }) => {
    if (isSearch) {
        return <EmptyView icon={<SearchIcon />} title={t`No results found.`} action={null} />;
    }

    return (
        <EmptyView
            title={t`Nothing to show here, {message} `({
                message: canCreate
                    ? "navigate to a different folder or create a..."
                    : "click on the left side to navigate to a different folder."
            })}
            action={
                canCreate ? (
                    <Buttons>
                        <ButtonDefault data-testid="new-folder-button" onClick={onCreateFolder}>
                            <Icon /> {t`New Folder`}
                        </ButtonDefault>
                        <ButtonDefault data-testid="new-entry-button" onClick={onCreateEntry}>
                            <Icon /> {t`New Entry`}
                        </ButtonDefault>
                    </Buttons>
                ) : (
                    <></>
                )
            }
        />
    );
};