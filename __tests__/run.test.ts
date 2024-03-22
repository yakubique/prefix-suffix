import * as core from '@actions/core';
import * as helper from '../src/io-helper';

import { describe, expect } from '@jest/globals';
import { Types } from '../src/io-helper';
import { run } from '../src/run';


let getInputsMock: jest.SpiedFunction<typeof helper.getInputs>;
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>;

describe('run.ts', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        getInputsMock = jest.spyOn(helper, 'getInputs').mockImplementation();
        setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation();
    });

    it('should wrap text', async () => {
        getInputsMock.mockImplementation(() => {
            return {
                input: 'text',
                type: Types.Text,
                prefix: '-||==',
                suffix: '==||-'
            } as helper.ActionInputs;
        });
        setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation();

        await run();
        expect(getInputsMock).toBeCalled();
        expect(setOutputMock).toHaveBeenCalledWith('result', '-||==text==||-');
    });

    it('should wrap flat', async () => {
        getInputsMock.mockImplementation(() => {
            return {
                input: JSON.stringify(['a', 'b']),
                type: Types.FlatJSON,
                prefix: '-||==',
                suffix: '==||-'
            } as helper.ActionInputs;
        });
        setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation(() => '');

        await run();
        expect(getInputsMock).toBeCalled();
        expect(setOutputMock).toHaveBeenNthCalledWith(1, 'result', [
            '-||==a==||-',
            '-||==b==||-'
        ]);
    });

    it('should wrap nested', async () => {
        getInputsMock.mockImplementation(() => {
            return {
                input: JSON.stringify([{ a: 'a' }, { a: 'b' }]),
                type: Types.NestedJSON,
                key: 'a',
                prefix: '-||==',
                suffix: '==||-'
            } as helper.ActionInputs;
        });
        setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation(() => '');

        await run();
        expect(getInputsMock).toBeCalled();
        expect(setOutputMock).toHaveBeenNthCalledWith(1, 'result', [
            { a: '-||==a==||-' },
            { a: '-||==b==||-' }
        ]);
    });

    it('should fail', async () => {
        getInputsMock.mockImplementation(() => {
            return {
                input: 'andkjawkldm'
            } as helper.ActionInputs;
        });
        setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation(() => '');

        await run();
        expect(getInputsMock).toBeCalled();
        expect(setOutputMock).not.toBeCalled();
    });
});

