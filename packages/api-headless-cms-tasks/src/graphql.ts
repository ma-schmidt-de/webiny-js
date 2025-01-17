import { CmsGraphQLSchemaPlugin, isHeadlessCmsReady } from "@webiny/api-headless-cms";
import { ContextPlugin } from "@webiny/handler-aws";
import { EntriesTask, HcmsTasksContext } from "~/types";
import { Response } from "@webiny/handler-graphql";

export const createGraphQL = () => {
    return new ContextPlugin<HcmsTasksContext>(async context => {
        if (!(await isHeadlessCmsReady(context))) {
            return;
        }

        const plugin = new CmsGraphQLSchemaPlugin({
            typeDefs: /* GraphQL */ `
                type EmptyTrashBinResponseData {
                    id: String
                }

                type EmptyTrashBinResponse {
                    data: EmptyTrashBinResponseData
                    error: CmsError
                }

                extend type Mutation {
                    emptyTrashBin(modelId: String!): EmptyTrashBinResponse
                }
            `,
            resolvers: {
                Mutation: {
                    emptyTrashBin: async (_, args) => {
                        const response = await context.tasks.trigger({
                            definition: EntriesTask.EmptyTrashBinByModel,
                            input: {
                                modelId: args.modelId
                            }
                        });

                        return new Response({
                            id: response.id
                        });
                    }
                }
            }
        });

        plugin.name = "headless-cms.graphql.schema.trashBin.types";

        context.plugins.register([plugin]);
    });
};
