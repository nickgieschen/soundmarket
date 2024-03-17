import {DatabaseMetadata} from "@adminjs/sql";
import {components} from "../../components";

const build = (db: DatabaseMetadata) => {
    return {
        databases: [db],
        resource: db.table("genres"),
        options: {
            actions: {
                merge: {
                    actionType: 'record',
                    component: components.GenreMerger,
                    handler: (request: any, response: any, context: any) => {
                        const {record, currentAdmin} = context
                        return {
                            record: record.toJSON(currentAdmin),
                            msg: 'Hello world',
                        }
                    },
                },
            },
        }
    };
}

export default build