import * as core from '@actions/core';
import { InputOptions } from '@actions/core';

enum Inputs {
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

function isBlank(value: any): boolean {
    return value === null || value === undefined || (value.length !== undefined && value.length === 0);
}

export function isNotBlank(value: any): boolean {
    return value !== null && value !== undefined && (value.length === undefined || value.length > 0);
}

export interface ActionInputs {
    input: string;
    type: string;
    key: string;
    prefix: string;
    suffix: string;
}

export function getInputs(): ActionInputs {
    const result: ActionInputs | any = {};

    result.input = `${core.getInput(Inputs.Input, { required: true })}`

    const typeVar = core.getInput(Inputs.Type, { required: false })
    if (isBlank(typeVar)) {
        result.type = Types.Text
    } else {
        result.type = typeVar
    }

    if (result.type == Types.NestedJSON) {
        result.key = core.getInput(Inputs.Key, { required: true })
    }

    result.prefix = core.getInput(Inputs.Prefix, { required: false })
    result.suffix = core.getInput(Inputs.Suffix, { required: false })

    return result;
}
