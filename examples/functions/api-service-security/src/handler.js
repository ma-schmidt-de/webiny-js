// @flow
import { createHandler, PluginsContainer } from "@webiny/api";
import createConfig from "service-config";
import servicePlugins from "@webiny/api/plugins/service";
import securityPlugins from "@webiny/api-security/plugins";

const plugins = new PluginsContainer([servicePlugins, securityPlugins]);

let apolloHandler;

export const handler = async (event: Object, context: Object) => {
    if (!apolloHandler) {
        const config = await createConfig();
        apolloHandler = (await createHandler({ plugins, config })).handler;
    }

    return apolloHandler(event, context);
};