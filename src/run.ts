import { ActionInputs, getInputs, Types } from './io-helper';
import { buildOutput, inputJson, isNotBlank } from '@yakubique/atils/dist';
import * as core from '@actions/core';

enum Outputs {
    result = 'result',
}

function wrap(text: string, inputs: ActionInputs): string {
    let result = text;

    if (isNotBlank(inputs.prefix)) {
        result = `${inputs.prefix}${result}`;
    }
    if (isNotBlank(inputs.suffix)) {
        result = `${result}${inputs.suffix}`;
    }

    return result;
}

export async function run() {
    const setOutputs = buildOutput(Outputs);

    try {
        const inputs: ActionInputs = getInputs();

        if (inputs.type === Types.Text.toString()) {
            setOutputs({ result: wrap(inputs.input, inputs) });
            return;
        }

        const input: any[] = inputJson(inputs.input, false);

        if (inputs.type === Types.FlatJSON.toString()) {
            setOutputs({
                result: input.map((item) => wrap(`${item}`, inputs))
            });
            return;
        }

        if (inputs.type === Types.NestedJSON.toString()) {
            setOutputs({
                result: input.map((item) => {
                    item[inputs.key] = wrap(item[inputs.key].toString(), inputs);

                    return item;
                })
            });
        }

        core.info('Success!');
    } catch (err: any) {
        core.setFailed(err.message);
    }
}
