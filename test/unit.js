/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as assert from "assert";

import * as Shift from "../"

suite("unit", () => {
  suite("toJSON", () => {
    test("includes `type` member", () => {
      let node = new Shift.LiteralNumericExpression(0);
      assert.equal(node.type, JSON.parse(JSON.stringify(node)).type);
    });
  });

  // enough nonces to fill up the longest constructor parameter list
  const NONCES = Array.apply(null, Array(Object.keys(Shift).reduce((memo, t) => Math.max(memo, Shift[t].length), 0))).map(() => ({}));

  function testConstructor(t, members) {
    test(t, () => {
      assert(Shift[t]);
      let node = new Shift[t](...NONCES);
      assert(node instanceof Shift[t]);
      if (t !== "SourceLocation" && t !== "SourceSpan") {
        assert.equal(typeof node.type, "string");
      }
      members.forEach((member, index) => {
        assert.equal(node[member], NONCES[index], `${t}: ${member}`);
      });
    });
  }

  const SPEC = {
    ArrayBinding: ["elements", "restElement"],
    ArrayExpression: ["elements"],
    ArrowExpression: ["parameters", "restParameter", "body"],
    AssignmentExpression: ["operator", "binding", "expression"],
    BinaryExpression: ["operator", "left", "right"],
    BindingIdentifier: ["identifier"],
    BindingPropertyIdentifier: ["identifier", "init"],
    BindingPropertyProperty: ["name", "binding"],
    BindingWithDefault: ["binding", "init"],
    Block: ["statements"],
    BlockStatement: ["block"],
    BreakStatement: ["label"],
    CallExpression: ["callee", "arguments"],
    CatchClause: ["binding", "body"],
    ClassElement: ["isStatic", "method"],
    ClassExpression: ["name", "super", "elements"],
    ClassDeclaration: ["name", "super", "elements"],
    ComputedMemberExpression: ["object", "expression"],
    ComputedPropertyName: ["value"],
    ConditionalExpression: ["test", "consequent", "alternate"],
    ContinueStatement: ["label"],
    DataProperty: ["name", "expression"],
    DebuggerStatement: [],
    Directive: ["value"],
    DoWhileStatement: ["body", "test"],
    EmptyStatement: [],
    Export: ["declaration"],
    ExportAllFrom: ["moduleSpecifier"],
    ExportDefault: ["value"],
    ExportFrom: ["namedExports", "moduleSpecifier"],
    ExportSpecifier: ["name", "exportedName"],
    ExpressionStatement: ["expression"],
    ForInStatement: ["left", "right", "body"],
    ForOfStatement: ["left", "right", "body"],
    ForStatement: ["init", "test", "update", "body"],
    FunctionBody: ["directives", "statements"],
    FunctionDeclaration: ["isGenerator", "name", "parameters", "restParameter", "body"],
    FunctionExpression: ["isGenerator", "name", "parameters", "restParameter", "body"],
    Getter: ["name", "body"],
    Identifier: ["name"],
    IdentifierExpression: ["identifier"],
    IfStatement: ["test", "consequent", "alternate"],
    Import: ["defaultBinding", "namedImports", "moduleSpecifier"],
    ImportNamespace: ["defaultBinding", "namespaceBinding", "moduleSpecifier"],
    ImportSpecifier: ["name", "binding"],
    LabeledStatement: ["label", "body"],
    LiteralBooleanExpression: ["value"],
    LiteralInfinityExpression: [],
    LiteralNullExpression: [],
    LiteralNumericExpression: ["value"],
    LiteralRegExpExpression: ["pattern", "flags"],
    LiteralStringExpression: ["value"],
    Method: ["isGenerator", "name", "parameters", "restParameter", "body"],
    Module: ["moduleItems"],
    NewExpression: ["callee", "arguments"],
    NewTargetExpression: [],
    ObjectBinding: ["properties"],
    ObjectExpression: ["properties"],
    PostfixExpression: ["operand", "operator"],
    PrefixExpression: ["operator", "operand"],
    ReturnStatement: ["expression"],
    Script: ["body"],
    Setter: ["name", "parameter", "body"],
    ShorthandProperty: ["name"],
    SourceLocation: ["offset", "line", "column"],
    SourceSpan: ["start", "end", "source"],
    SpreadElement: ["expression"],
    StaticMemberExpression: ["object", "property"],
    StaticPropertyName: ["value"],
    Super: [],
    SwitchCase: ["test", "consequent"],
    SwitchDefault: ["consequent"],
    SwitchStatement: ["discriminant", "cases"],
    SwitchStatementWithDefault: ["discriminant", "preDefaultCases", "defaultCase", "postDefaultCases"],
    TemplateLiteral: ["value"],
    TemplateString: ["tag", "elements"],
    ThisExpression: [],
    ThrowStatement: ["expression"],
    TryCatchStatement: ["body", "catchClause"],
    TryFinallyStatement: ["body", "catchClause", "finalizer"],
    VariableDeclaration: ["kind", "declarators"],
    VariableDeclarationStatement: ["declaration"],
    VariableDeclarator: ["binding", "init"],
    WhileStatement: ["test", "body"],
    WithStatement: ["object", "body"],
    YieldExpression: ["expression"],
    YieldGeneratorExpression: ["expression"],
  };

  suite("constructors", () => {
    test("all constructors are tested", () => {
      let shiftCtors = Object.keys(Shift).sort();
      let specCtors = Object.keys(SPEC).sort();
      shiftCtors.forEach((shiftCtor, i) => {
        assert.equal(shiftCtor, specCtors[i]);
      });
      assert.equal(shiftCtors.length, specCtors.length);
    });

    Object.keys(SPEC).forEach((t) => {
      testConstructor(t, SPEC[t]);
    });
  });

  test("VariableDeclaration declarators must be non-empty", () => {
    assert.throws(() => new Shift.VariableDeclaration("var", []));
  });
});
