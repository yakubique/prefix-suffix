import * as core from '@actions/core';
import { getOptional } from "@yakubique/atils/dist";

export enum Inputs {
    Input = 'input',
    Type = 'type',
    Key = 'key',
    Prefix = 'prefix',
    Suffix = 'suffix',
}

export enum Types {
    Text = 'text',
    FlatJSON = 'flat-json',
    NestedJSON = 'nested-json'
}

export interface ActionInputs {
    input: string;
    type: string;
    key: string;
    prefix: string;
    suffix: string;
}

const notRequired = { required: false };
const required = { required: true };

export function getInputs(): ActionInputs {
    const result: ActionInputs = {} as ActionInputs;

    result.input = core.getInput(Inputs.Input, required)
    result.type = getOptional(Inputs.Type, Types.Text, notRequired)

    if (result.type == Types.NestedJSON) {
        result.key = core.getInput(Inputs.Key, required)
    }

    result.prefix = core.getInput(Inputs.Prefix, notRequired)
    result.suffix = core.getInput(Inputs.Suffix, notRequired)

    return result;
}
