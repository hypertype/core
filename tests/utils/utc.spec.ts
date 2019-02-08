import {suite, test} from "mocha-typescript";
import {utc} from "../../utils/utc";
import {expect} from "chai";

@suite
export class UtcSpec {

    @test
    now(){
        const now = utc();
        expect(now).to.be.not.null;

    }
}