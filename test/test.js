const protoext = require("../index");
protoext.appendGCToObject();
protoext.appendEXToFunction();
const assert = require('assert');

let ClassA = function(name){this.name = name;}
ClassA.prototype.say = function(msg){console.log(msg);}

let ClassB = ClassA.__extend(function ClassB(){
    ClassA.call(this,"sam")
},{
    sayhello:function(){
        this.say("hello")
    }
})

let ClassC = ClassA.__extend(function ClassB(){
    ClassA.call(this,"ClassC")
    this.age = 11;
},{
    say:function(msg){
        ClassA.prototype.say.call(this,this.name+" say:"+msg)
    }
})

var a,b;
var c = new ClassC();

describe('protoext', () => {
    before(function () {
        //console.log('before:');
    });

    after(function () {
        //console.log('after.');
    });

    beforeEach(function () {
        //console.log('  beforeEach:');
    });

    afterEach(function () {
        //console.log('  afterEach.');
    });

    it('Object.prototype has __proto__path__', () => {
        assert.strictEqual(typeof Object.prototype.__proto__path__, "function");
    });

    it('Function.prototype has __extend', () => {
        assert.strictEqual(typeof Function.prototype.__extend, "function");
    });

    it('a = new ClassA("bobo")', () => {
        a = new ClassA("bobo");
        assert.strictEqual(a instanceof ClassA, true);
    });
    it('a has say function', () => {
        assert.strictEqual(typeof a.say, "function");
    });
    it('b = new ClassB()', () => {
        b = new ClassB()
        assert.strictEqual(b instanceof ClassB, true);
    });
    it('b.__proto__ instanceof ClassA', () => {
        assert.strictEqual(b.__proto__ instanceof ClassA, true);
    });
    it('a has say function', () => {
        assert.strictEqual(typeof a.say, "function");
    });
});
