import * as core from '@actions/core';
import { ActionInputs, getInputs, isNotBlank, Types } from './io-helper';

enum Outputs {
    result = 'result',
}

function setOutputs(response: any, log?: boolean) {
    let message = '';
    for (const key in Outputs) {
        const field: string = (Outputs as any)[key];
        if (log) {
            message += `\n  ${field}: ${JSON.stringify(response[field])}`;
        }
        core.setOutput(field, response[field]);
    }

    if (log) {
        core.info('Outputs:' + message);
    }
}

function wrap(text: string, inputs: ActionInputs): string {
    let result = text;

    if (isNotBlank(inputs.prefix)) {
        result = `${inputs.prefix}${result}`;
    }
    if (isNotBlank(inputs.suffix)) {
        result = `${result}${inputs.suffix}`
    }

    return result
}

(async function run() {
    try {
        const inputs: ActionInputs = getInputs();

        if (inputs.type === Types.Text) {
            setOutputs({ result: wrap(inputs.input, inputs) })
            return
        }

        const input = JSON.parse(inputs.input) as any[]

        if (inputs.type === Types.FlatJSON) {
            setOutputs({
                result: input.map((item) => wrap(`${item}`, inputs))
            })
            return
        }

        if (inputs.type === Types.NestedJSON) {
            setOutputs({
                result: input.map((item) => {
                    item[inputs.key] = wrap(item[inputs.key].toString(), inputs)

                    return item;
                })
            })
        }

        core.info('Get release has finished successfully');
    } catch (err: any) {
        core.setFailed(err.message);
    }
})();
