import * as core from '@actions/core';
import { describe, expect } from '@jest/globals';
import { ActionInputs, getInputs, Inputs, Types } from '../src/io-helper';

let getInputMock: jest.SpiedFunction<typeof core.getInput>;

const jsonStr = JSON.stringify([{ a: 'string' }, { a: 'a-string' }]);

describe('io-helper.ts', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        getInputMock = jest.spyOn(core, 'getInput').mockImplementation();
    });

    it('should get proper input', () => {
        getInputMock.mockImplementation((name, _) => {
            switch (name) {
                case Inputs.Input:
                    return jsonStr;
                case Inputs.Type:
                    return Types.NestedJSON;
                case Inputs.Key:
                    return 'a';
                case Inputs.Prefix:
                    return 'pref-';
                case Inputs.Suffix:
                    return '-suf';
                default:
                    return '';
            }
        });

        const inputs = getInputs();
        expect(inputs).toEqual({
            input: jsonStr,
            type: 'nested-json',
            key: 'a',
            prefix: 'pref-',
            suffix: '-suf'
        } as ActionInputs);
    });
});

