import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {Serializer} from "../../utils/serializer";



@suite()
export class SerializerSpec {


    @test
    testUTF(){
        const obj = {
            a: 'sadfvdas‡‰'
        };
        const ser = Serializer.serialize(obj);
        const obj2 = Serializer.deserialize(ser);
        expect(obj2).to.be.deep.equal(obj2);
    }

    @test()
    testBig(){
        // const ser = Serializer.serialize(obj);
        // console.log(ser.length);
        // const obj2 = Serializer.deserialize(ser);
        // expect(obj2).to.be.deep.equal(obj2);
    }
}

