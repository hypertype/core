import {utc} from "../../utils/utc";
import {expect, suite, test} from "@hypertype/tools/test/index.js";

@suite
export class UtcSpec {

    @test
    now(){
        const now = utc();
        expect(now).to.be.not.null;

    }
}