let wasm;

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_4.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
 * @returns {string}
 */
export function version() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.version();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

export function run() {
    wasm.run();
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_4.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_4.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24}
 */
export const CompletionKind = Object.freeze({
    Text: 0, "0": "Text",
    Method: 1, "1": "Method",
    Function: 2, "2": "Function",
    Constructor: 3, "3": "Constructor",
    Field: 4, "4": "Field",
    Variable: 5, "5": "Variable",
    Class: 6, "6": "Class",
    Interface: 7, "7": "Interface",
    Module: 8, "8": "Module",
    Property: 9, "9": "Property",
    Unit: 10, "10": "Unit",
    Value: 11, "11": "Value",
    Enum: 12, "12": "Enum",
    Keyword: 13, "13": "Keyword",
    Snippet: 14, "14": "Snippet",
    Color: 15, "15": "Color",
    File: 16, "16": "File",
    Reference: 17, "17": "Reference",
    Folder: 18, "18": "Folder",
    EnumMember: 19, "19": "EnumMember",
    Constant: 20, "20": "Constant",
    Struct: 21, "21": "Struct",
    Event: 22, "22": "Event",
    Operator: 23, "23": "Operator",
    TypeParameter: 24, "24": "TypeParameter",
});
/**
 * @enum {1 | 2 | 3}
 */
export const DocumentHighlightKind = Object.freeze({
    Text: 1, "1": "Text",
    Read: 2, "2": "Read",
    Write: 3, "3": "Write",
});
/**
 * @enum {0 | 1}
 */
export const InlayHintKind = Object.freeze({
    Type: 0, "0": "Type",
    Parameter: 1, "1": "Parameter",
});
/**
 * @enum {0 | 1 | 2}
 */
export const PositionEncoding = Object.freeze({
    Utf8: 0, "0": "Utf8",
    Utf16: 1, "1": "Utf16",
    Utf32: 2, "2": "Utf32",
});
/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14}
 */
export const SemanticTokenKind = Object.freeze({
    Namespace: 0, "0": "Namespace",
    Class: 1, "1": "Class",
    Parameter: 2, "2": "Parameter",
    SelfParameter: 3, "3": "SelfParameter",
    ClsParameter: 4, "4": "ClsParameter",
    Variable: 5, "5": "Variable",
    Property: 6, "6": "Property",
    Function: 7, "7": "Function",
    Method: 8, "8": "Method",
    Keyword: 9, "9": "Keyword",
    String: 10, "10": "String",
    Number: 11, "11": "Number",
    Decorator: 12, "12": "Decorator",
    BuiltinConstant: 13, "13": "BuiltinConstant",
    TypeParameter: 14, "14": "TypeParameter",
});
/**
 * @enum {0 | 1 | 2 | 3}
 */
export const Severity = Object.freeze({
    Info: 0, "0": "Info",
    Warning: 1, "1": "Warning",
    Error: 2, "2": "Error",
    Fatal: 3, "3": "Fatal",
});

const CompletionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_completion_free(ptr >>> 0, 1));

export class Completion {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Completion.prototype);
        obj.__wbg_ptr = ptr;
        CompletionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompletionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_completion_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_completion_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set name(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_completion_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {CompletionKind | undefined}
     */
    get kind() {
        const ret = wasm.__wbg_get_completion_kind(this.__wbg_ptr);
        return ret === 25 ? undefined : ret;
    }
    /**
     * @param {CompletionKind | null} [arg0]
     */
    set kind(arg0) {
        wasm.__wbg_set_completion_kind(this.__wbg_ptr, isLikeNone(arg0) ? 25 : arg0);
    }
    /**
     * @returns {string | undefined}
     */
    get documentation() {
        const ret = wasm.__wbg_get_completion_documentation(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set documentation(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_completion_documentation(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string | undefined}
     */
    get detail() {
        const ret = wasm.__wbg_get_completion_detail(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set detail(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_completion_detail(this.__wbg_ptr, ptr0, len0);
    }
}

const DiagnosticFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_diagnostic_free(ptr >>> 0, 1));

export class Diagnostic {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Diagnostic.prototype);
        obj.__wbg_ptr = ptr;
        DiagnosticFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DiagnosticFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_diagnostic_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    message() {
        const ret = wasm.diagnostic_message(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    id() {
        const ret = wasm.diagnostic_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Severity}
     */
    severity() {
        const ret = wasm.diagnostic_severity(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {TextRange | undefined}
     */
    textRange() {
        const ret = wasm.diagnostic_textRange(this.__wbg_ptr);
        return ret === 0 ? undefined : TextRange.__wrap(ret);
    }
    /**
     * @param {Workspace} workspace
     * @returns {Range | undefined}
     */
    toRange(workspace) {
        _assertClass(workspace, Workspace);
        const ret = wasm.diagnostic_toRange(this.__wbg_ptr, workspace.__wbg_ptr);
        return ret === 0 ? undefined : Range.__wrap(ret);
    }
    /**
     * @param {Workspace} workspace
     * @returns {string}
     */
    display(workspace) {
        _assertClass(workspace, Workspace);
        const ret = wasm.diagnostic_display(this.__wbg_ptr, workspace.__wbg_ptr);
        return ret;
    }
}

const DocumentHighlightFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_documenthighlight_free(ptr >>> 0, 1));

export class DocumentHighlight {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DocumentHighlight.prototype);
        obj.__wbg_ptr = ptr;
        DocumentHighlightFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DocumentHighlightFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_documenthighlight_free(ptr, 0);
    }
    /**
     * @returns {Range}
     */
    get range() {
        const ret = wasm.__wbg_get_documenthighlight_range(this.__wbg_ptr);
        return Range.__wrap(ret);
    }
    /**
     * @returns {DocumentHighlightKind}
     */
    get kind() {
        const ret = wasm.__wbg_get_documenthighlight_kind(this.__wbg_ptr);
        return ret;
    }
}

const FileHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_filehandle_free(ptr >>> 0, 1));

export class FileHandle {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FileHandle.prototype);
        obj.__wbg_ptr = ptr;
        FileHandleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    toJSON() {
        return {
        };
    }

    toString() {
        return JSON.stringify(this);
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FileHandleFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_filehandle_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.filehandle_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    path() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.filehandle_path(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const HoverFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hover_free(ptr >>> 0, 1));

export class Hover {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Hover.prototype);
        obj.__wbg_ptr = ptr;
        HoverFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HoverFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hover_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get markdown() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_hover_markdown(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set markdown(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_completion_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {Range}
     */
    get range() {
        const ret = wasm.__wbg_get_hover_range(this.__wbg_ptr);
        return Range.__wrap(ret);
    }
    /**
     * @param {Range} arg0
     */
    set range(arg0) {
        _assertClass(arg0, Range);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_hover_range(this.__wbg_ptr, ptr0);
    }
}

const InlayHintFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_inlayhint_free(ptr >>> 0, 1));

export class InlayHint {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(InlayHint.prototype);
        obj.__wbg_ptr = ptr;
        InlayHintFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        InlayHintFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_inlayhint_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get markdown() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_inlayhint_markdown(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set markdown(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_completion_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {Position}
     */
    get position() {
        const ret = wasm.__wbg_get_inlayhint_position(this.__wbg_ptr);
        return Position.__wrap(ret);
    }
    /**
     * @param {Position} arg0
     */
    set position(arg0) {
        _assertClass(arg0, Position);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_inlayhint_position(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {InlayHintKind}
     */
    get kind() {
        const ret = wasm.__wbg_get_inlayhint_kind(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {InlayHintKind} arg0
     */
    set kind(arg0) {
        wasm.__wbg_set_inlayhint_kind(this.__wbg_ptr, arg0);
    }
}

const LocationLinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_locationlink_free(ptr >>> 0, 1));

export class LocationLink {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LocationLink.prototype);
        obj.__wbg_ptr = ptr;
        LocationLinkFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LocationLinkFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_locationlink_free(ptr, 0);
    }
    /**
     * The target file path
     * @returns {string}
     */
    get path() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_locationlink_path(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * The target file path
     * @param {string} arg0
     */
    set path(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_locationlink_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * The full range of the target
     * @returns {Range}
     */
    get full_range() {
        const ret = wasm.__wbg_get_locationlink_full_range(this.__wbg_ptr);
        return Range.__wrap(ret);
    }
    /**
     * The full range of the target
     * @param {Range} arg0
     */
    set full_range(arg0) {
        _assertClass(arg0, Range);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_locationlink_full_range(this.__wbg_ptr, ptr0);
    }
    /**
     * The target's range that should be selected/highlighted
     * @returns {Range | undefined}
     */
    get selection_range() {
        const ret = wasm.__wbg_get_locationlink_selection_range(this.__wbg_ptr);
        return ret === 0 ? undefined : Range.__wrap(ret);
    }
    /**
     * The target's range that should be selected/highlighted
     * @param {Range | null} [arg0]
     */
    set selection_range(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Range);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_locationlink_selection_range(this.__wbg_ptr, ptr0);
    }
    /**
     * The range of the origin.
     * @returns {Range | undefined}
     */
    get origin_selection_range() {
        const ret = wasm.__wbg_get_locationlink_origin_selection_range(this.__wbg_ptr);
        return ret === 0 ? undefined : Range.__wrap(ret);
    }
    /**
     * The range of the origin.
     * @param {Range | null} [arg0]
     */
    set origin_selection_range(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Range);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_locationlink_origin_selection_range(this.__wbg_ptr, ptr0);
    }
}

const ParameterInformationFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_parameterinformation_free(ptr >>> 0, 1));

export class ParameterInformation {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ParameterInformation.prototype);
        obj.__wbg_ptr = ptr;
        ParameterInformationFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof ParameterInformation)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ParameterInformationFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_parameterinformation_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get label() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_parameterinformation_label(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set label(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_completion_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string | undefined}
     */
    get documentation() {
        const ret = wasm.__wbg_get_parameterinformation_documentation(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set documentation(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_completion_documentation(this.__wbg_ptr, ptr0, len0);
    }
}

const PositionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_position_free(ptr >>> 0, 1));

export class Position {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Position.prototype);
        obj.__wbg_ptr = ptr;
        PositionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PositionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_position_free(ptr, 0);
    }
    /**
     * One indexed line number
     * @returns {number}
     */
    get line() {
        const ret = wasm.__wbg_get_position_line(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * One indexed line number
     * @param {number} arg0
     */
    set line(arg0) {
        wasm.__wbg_set_position_line(this.__wbg_ptr, arg0);
    }
    /**
     * One indexed column number (the nth character on the line)
     * @returns {number}
     */
    get column() {
        const ret = wasm.__wbg_get_position_column(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * One indexed column number (the nth character on the line)
     * @param {number} arg0
     */
    set column(arg0) {
        wasm.__wbg_set_position_column(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} line
     * @param {number} column
     */
    constructor(line, column) {
        const ret = wasm.position_new(line, column);
        this.__wbg_ptr = ret >>> 0;
        PositionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const RangeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_range_free(ptr >>> 0, 1));

export class Range {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Range.prototype);
        obj.__wbg_ptr = ptr;
        RangeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RangeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_range_free(ptr, 0);
    }
    /**
     * @returns {Position}
     */
    get start() {
        const ret = wasm.__wbg_get_range_start(this.__wbg_ptr);
        return Position.__wrap(ret);
    }
    /**
     * @param {Position} arg0
     */
    set start(arg0) {
        _assertClass(arg0, Position);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_range_start(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Position}
     */
    get end() {
        const ret = wasm.__wbg_get_range_end(this.__wbg_ptr);
        return Position.__wrap(ret);
    }
    /**
     * @param {Position} arg0
     */
    set end(arg0) {
        _assertClass(arg0, Position);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_range_end(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Position} start
     * @param {Position} end
     */
    constructor(start, end) {
        _assertClass(start, Position);
        var ptr0 = start.__destroy_into_raw();
        _assertClass(end, Position);
        var ptr1 = end.__destroy_into_raw();
        const ret = wasm.range_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        RangeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const SemanticTokenFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_semantictoken_free(ptr >>> 0, 1));

export class SemanticToken {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SemanticToken.prototype);
        obj.__wbg_ptr = ptr;
        SemanticTokenFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SemanticTokenFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_semantictoken_free(ptr, 0);
    }
    /**
     * @returns {SemanticTokenKind}
     */
    get kind() {
        const ret = wasm.__wbg_get_semantictoken_kind(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {SemanticTokenKind} arg0
     */
    set kind(arg0) {
        wasm.__wbg_set_semantictoken_kind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get modifiers() {
        const ret = wasm.__wbg_get_position_column(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set modifiers(arg0) {
        wasm.__wbg_set_position_column(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Range}
     */
    get range() {
        const ret = wasm.__wbg_get_semantictoken_range(this.__wbg_ptr);
        return Range.__wrap(ret);
    }
    /**
     * @param {Range} arg0
     */
    set range(arg0) {
        _assertClass(arg0, Range);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_semantictoken_range(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {string[]}
     */
    static kinds() {
        const ret = wasm.semantictoken_kinds();
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {string[]}
     */
    static modifiers() {
        const ret = wasm.semantictoken_modifiers();
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}

const SignatureHelpFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signaturehelp_free(ptr >>> 0, 1));

export class SignatureHelp {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SignatureHelp.prototype);
        obj.__wbg_ptr = ptr;
        SignatureHelpFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SignatureHelpFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_signaturehelp_free(ptr, 0);
    }
    /**
     * @returns {SignatureInformation[]}
     */
    get signatures() {
        const ret = wasm.__wbg_get_signaturehelp_signatures(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {SignatureInformation[]} arg0
     */
    set signatures(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_signaturehelp_signatures(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number | undefined}
     */
    get active_signature() {
        const ret = wasm.__wbg_get_signaturehelp_active_signature(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set active_signature(arg0) {
        wasm.__wbg_set_signaturehelp_active_signature(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
}

const SignatureInformationFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signatureinformation_free(ptr >>> 0, 1));

export class SignatureInformation {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SignatureInformation.prototype);
        obj.__wbg_ptr = ptr;
        SignatureInformationFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof SignatureInformation)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SignatureInformationFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_signatureinformation_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get label() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_signatureinformation_label(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set label(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_signatureinformation_label(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string | undefined}
     */
    get documentation() {
        const ret = wasm.__wbg_get_signatureinformation_documentation(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set documentation(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_signatureinformation_documentation(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {ParameterInformation[]}
     */
    get parameters() {
        const ret = wasm.__wbg_get_signatureinformation_parameters(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {ParameterInformation[]} arg0
     */
    set parameters(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_signatureinformation_parameters(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number | undefined}
     */
    get active_parameter() {
        const ret = wasm.__wbg_get_signaturehelp_active_signature(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set active_parameter(arg0) {
        wasm.__wbg_set_signaturehelp_active_signature(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
}

const TextRangeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_textrange_free(ptr >>> 0, 1));

export class TextRange {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TextRange.prototype);
        obj.__wbg_ptr = ptr;
        TextRangeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextRangeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_textrange_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get start() {
        const ret = wasm.__wbg_get_position_line(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set start(arg0) {
        wasm.__wbg_set_position_line(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get end() {
        const ret = wasm.__wbg_get_position_column(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set end(arg0) {
        wasm.__wbg_set_position_column(this.__wbg_ptr, arg0);
    }
}

const WorkspaceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_workspace_free(ptr >>> 0, 1));

export class Workspace {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WorkspaceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_workspace_free(ptr, 0);
    }
    /**
     * @param {string} root
     * @param {PositionEncoding} position_encoding
     * @param {any} options
     */
    constructor(root, position_encoding, options) {
        const ptr0 = passStringToWasm0(root, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.workspace_new(ptr0, len0, position_encoding, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        WorkspaceFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {any} options
     */
    updateOptions(options) {
        const ret = wasm.workspace_updateOptions(this.__wbg_ptr, options);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} path
     * @param {string} contents
     * @returns {FileHandle}
     */
    openFile(path, contents) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(contents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.workspace_openFile(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FileHandle.__wrap(ret[0]);
    }
    /**
     * @param {FileHandle} file_id
     * @param {string} contents
     */
    updateFile(file_id, contents) {
        _assertClass(file_id, FileHandle);
        const ptr0 = passStringToWasm0(contents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.workspace_updateFile(this.__wbg_ptr, file_id.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {FileHandle} file_id
     */
    closeFile(file_id) {
        _assertClass(file_id, FileHandle);
        var ptr0 = file_id.__destroy_into_raw();
        const ret = wasm.workspace_closeFile(this.__wbg_ptr, ptr0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Checks a single file.
     * @param {FileHandle} file_id
     * @returns {Diagnostic[]}
     */
    checkFile(file_id) {
        _assertClass(file_id, FileHandle);
        const ret = wasm.workspace_checkFile(this.__wbg_ptr, file_id.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Checks all open files
     * @returns {Diagnostic[]}
     */
    check() {
        const ret = wasm.workspace_check(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the parsed AST for `path`
     * @param {FileHandle} file_id
     * @returns {string}
     */
    parsed(file_id) {
        let deferred2_0;
        let deferred2_1;
        try {
            _assertClass(file_id, FileHandle);
            const ret = wasm.workspace_parsed(this.__wbg_ptr, file_id.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {FileHandle} file_id
     * @returns {string | undefined}
     */
    format(file_id) {
        _assertClass(file_id, FileHandle);
        const ret = wasm.workspace_format(this.__wbg_ptr, file_id.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Returns the token stream for `path` serialized as a string.
     * @param {FileHandle} file_id
     * @returns {string}
     */
    tokens(file_id) {
        let deferred2_0;
        let deferred2_1;
        try {
            _assertClass(file_id, FileHandle);
            const ret = wasm.workspace_tokens(this.__wbg_ptr, file_id.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {FileHandle} file_id
     * @returns {string}
     */
    sourceText(file_id) {
        let deferred2_0;
        let deferred2_1;
        try {
            _assertClass(file_id, FileHandle);
            const ret = wasm.workspace_sourceText(this.__wbg_ptr, file_id.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {FileHandle} file_id
     * @param {Position} position
     * @returns {LocationLink[]}
     */
    gotoTypeDefinition(file_id, position) {
        _assertClass(file_id, FileHandle);
        _assertClass(position, Position);
        var ptr0 = position.__destroy_into_raw();
        const ret = wasm.workspace_gotoTypeDefinition(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @param {FileHandle} file_id
     * @param {Position} position
     * @returns {LocationLink[]}
     */
    gotoDeclaration(file_id, position) {
        _assertClass(file_id, FileHandle);
        _assertClass(position, Position);
        var ptr0 = position.__destroy_into_raw();
        const ret = wasm.workspace_gotoDeclaration(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @param {FileHandle} file_id
     * @param {Position} position
     * @returns {LocationLink[]}
     */
    gotoDefinition(file_id, position) {
        _assertClass(file_id, FileHandle);
        _assertClass(position, Position);
        var ptr0 = position.__destroy_into_raw();
        const ret = wasm.workspace_gotoDefinition(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @param {FileHandle} file_id
     * @param {Position} position
     * @returns {LocationLink[]}
     */
    gotoReferences(file_id, position) {
        _assertClass(file_id, FileHandle);
        _assertClass(position, Position);
        var ptr0 = position.__destroy_into_raw();
        const ret = wasm.workspace_gotoReferences(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @param {FileHandle} file_id
     * @param {Position} position
     * @returns {Hover | undefined}
     */
    hover(file_id, position) {
        _assertClass(file_id, FileHandle);
        _assertClass(position, Position);
        var ptr0 = position.__destroy_into_raw();
        const ret = wasm.workspace_hover(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : Hover.__wrap(ret[0]);
    }
    /**
     * @param {FileHandle} file_id
     * @param {Position} position
     * @returns {Completion[]}
     */
    completions(file_id, position) {
        _assertClass(file_id, FileHandle);
        _assertClass(position, Position);
        var ptr0 = position.__destroy_into_raw();
        const ret = wasm.workspace_completions(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @param {FileHandle} file_id
     * @param {Range} range
     * @returns {InlayHint[]}
     */
    inlayHints(file_id, range) {
        _assertClass(file_id, FileHandle);
        _assertClass(range, Range);
        var ptr0 = range.__destroy_into_raw();
        const ret = wasm.workspace_inlayHints(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @param {FileHandle} file_id
     * @returns {SemanticToken[]}
     */
    semanticTokens(file_id) {
        _assertClass(file_id, FileHandle);
        const ret = wasm.workspace_semanticTokens(this.__wbg_ptr, file_id.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {FileHandle} file_id
     * @param {Range} range
     * @returns {SemanticToken[]}
     */
    semanticTokensInRange(file_id, range) {
        _assertClass(file_id, FileHandle);
        _assertClass(range, Range);
        var ptr0 = range.__destroy_into_raw();
        const ret = wasm.workspace_semanticTokensInRange(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @param {FileHandle} file_id
     * @param {Position} position
     * @returns {SignatureHelp | undefined}
     */
    signatureHelp(file_id, position) {
        _assertClass(file_id, FileHandle);
        _assertClass(position, Position);
        var ptr0 = position.__destroy_into_raw();
        const ret = wasm.workspace_signatureHelp(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] === 0 ? undefined : SignatureHelp.__wrap(ret[0]);
    }
    /**
     * @param {FileHandle} file_id
     * @param {Position} position
     * @returns {DocumentHighlight[]}
     */
    documentHighlights(file_id, position) {
        _assertClass(file_id, FileHandle);
        _assertClass(position, Position);
        var ptr0 = position.__destroy_into_raw();
        const ret = wasm.workspace_documentHighlights(this.__wbg_ptr, file_id.__wbg_ptr, ptr0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Gets a file handle for a vendored file by its path.
     * This allows vendored files to participate in LSP features like hover, completions, etc.
     * @param {string} path
     * @returns {FileHandle}
     */
    getVendoredFile(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.workspace_getVendoredFile(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FileHandle.__wrap(ret[0]);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(arg0, arg1) {
        const ret = String(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
        const ret = arg0.buffer;
        return ret;
    };
    imports.wbg.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_completion_new = function(arg0) {
        const ret = Completion.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_debug_3cb59063b29f58c1 = function(arg0) {
        console.debug(arg0);
    };
    imports.wbg.__wbg_diagnostic_new = function(arg0) {
        const ret = Diagnostic.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_documenthighlight_new = function(arg0) {
        const ret = DocumentHighlight.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_done_769e5ede4b31c67b = function(arg0) {
        const ret = arg0.done;
        return ret;
    };
    imports.wbg.__wbg_entries_3265d4158b33e5dc = function(arg0) {
        const ret = Object.entries(arg0);
        return ret;
    };
    imports.wbg.__wbg_error_524f506f44df1645 = function(arg0) {
        console.error(arg0);
    };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_get_67b2ba62fc30de12 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
        const ret = arg0[arg1];
        return ret;
    };
    imports.wbg.__wbg_info_3daf2e093e091b66 = function(arg0) {
        console.info(arg0);
    };
    imports.wbg.__wbg_inlayhint_new = function(arg0) {
        const ret = InlayHint.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Map_f3469ce2244d2430 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Map;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_isArray_a1eab7e0d067391b = function(arg0) {
        const ret = Array.isArray(arg0);
        return ret;
    };
    imports.wbg.__wbg_isSafeInteger_343e2beeeece1bb0 = function(arg0) {
        const ret = Number.isSafeInteger(arg0);
        return ret;
    };
    imports.wbg.__wbg_iterator_9a24c88df860dc65 = function() {
        const ret = Symbol.iterator;
        return ret;
    };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_locationlink_new = function(arg0) {
        const ret = LocationLink.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_log_c222819a41e063d3 = function(arg0) {
        console.log(arg0);
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret = new Error();
        return ret;
    };
    imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_c68d7209be747379 = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_next_25feadfc0913fea9 = function(arg0) {
        const ret = arg0.next;
        return ret;
    };
    imports.wbg.__wbg_next_6574e1a8a62d1055 = function() { return handleError(function (arg0) {
        const ret = arg0.next();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_now_2c95c9de01293173 = function(arg0) {
        const ret = arg0.now();
        return ret;
    };
    imports.wbg.__wbg_now_807e54c39636c349 = function() {
        const ret = Date.now();
        return ret;
    };
    imports.wbg.__wbg_parameterinformation_new = function(arg0) {
        const ret = ParameterInformation.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_parameterinformation_unwrap = function(arg0) {
        const ret = ParameterInformation.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_performance_7a3ffd0b17f663ad = function(arg0) {
        const ret = arg0.performance;
        return ret;
    };
    imports.wbg.__wbg_semantictoken_new = function(arg0) {
        const ret = SemanticToken.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_signatureinformation_new = function(arg0) {
        const ret = SignatureInformation.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_signatureinformation_unwrap = function(arg0) {
        const ret = SignatureInformation.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
        const ret = typeof global === 'undefined' ? null : global;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
        const ret = typeof globalThis === 'undefined' ? null : globalThis;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
        const ret = typeof self === 'undefined' ? null : self;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
        const ret = typeof window === 'undefined' ? null : window;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_value_cd1ffa7b1ab794f1 = function(arg0) {
        const ret = arg0.value;
        return ret;
    };
    imports.wbg.__wbg_warn_4ca3906c248c47c4 = function(arg0) {
        console.warn(arg0);
    };
    imports.wbg.__wbindgen_as_number = function(arg0) {
        const ret = +arg0;
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_i64 = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return ret;
    };
    imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
        const v = arg1;
        const ret = typeof(v) === 'bigint' ? v : undefined;
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = arg0;
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = arg0 in arg1;
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_4;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_is_bigint = function(arg0) {
        const ret = typeof(arg0) === 'bigint';
        return ret;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(arg0) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(arg0) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = arg0 === arg1;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = arg0 == arg1;
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('ty_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
