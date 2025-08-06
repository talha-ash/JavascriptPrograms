const h = {
  Remove: "remove",
  Replace: "replace",
  Add: "add"
}, de = Symbol.for("__MUTATIVE_PROXY_DRAFT__"), he = Symbol("__MUTATIVE_RAW_RETURN_SYMBOL__"), H = Symbol.iterator, m = {
  mutable: "mutable",
  immutable: "immutable"
}, g = {};
function K(e, n) {
  return e instanceof Map ? e.has(n) : Object.prototype.hasOwnProperty.call(e, n);
}
function fe(e, n) {
  if (n in e) {
    let t = Reflect.getPrototypeOf(e);
    for (; t; ) {
      const o = Reflect.getOwnPropertyDescriptor(t, n);
      if (o)
        return o;
      t = Reflect.getPrototypeOf(t);
    }
  }
}
function k(e) {
  return Object.getPrototypeOf(e) === Set.prototype;
}
function ee(e) {
  return Object.getPrototypeOf(e) === Map.prototype;
}
function w(e) {
  var n;
  return (n = e.copy) !== null && n !== void 0 ? n : e.original;
}
function x(e) {
  return !!u(e);
}
function u(e) {
  return typeof e != "object" ? null : e?.[de];
}
function ne(e) {
  var n;
  const t = u(e);
  return t ? (n = t.copy) !== null && n !== void 0 ? n : t.original : e;
}
function M(e, n) {
  if (!e || typeof e != "object")
    return !1;
  let t;
  return Object.getPrototypeOf(e) === Object.prototype || Array.isArray(e) || e instanceof Map || e instanceof Set || !!n?.mark && ((t = n.mark(e, m)) === m.immutable || typeof t == "function");
}
function ye(e, n = []) {
  if (Object.hasOwnProperty.call(e, "key")) {
    const t = e.parent.copy, o = u(P(t, e.key));
    if (o !== null && o?.original !== e.original)
      return null;
    const r = e.parent.type === 3, c = r ? Array.from(e.parent.setMap.keys()).indexOf(e.key) : e.key;
    if (!(r && t.size > c || K(t, c)))
      return null;
    n.push(c);
  }
  if (e.parent)
    return ye(e.parent, n);
  n.reverse();
  try {
    Se(e.copy, n);
  } catch {
    return null;
  }
  return n;
}
function F(e) {
  return Array.isArray(e) ? 1 : e instanceof Map ? 2 : e instanceof Set ? 3 : 0;
}
function P(e, n) {
  return F(e) === 2 ? e.get(n) : e[n];
}
function N(e, n, t) {
  F(e) === 2 ? e.set(n, t) : e[n] = t;
}
function X(e, n) {
  const t = u(e);
  return (t ? w(t) : e)[n];
}
function E(e, n) {
  return e === n ? e !== 0 || 1 / e === 1 / n : e !== e && n !== n;
}
function q(e) {
  if (e)
    for (; e.finalities.revoke.length > 0; )
      e.finalities.revoke.pop()();
}
function D(e, n) {
  return n ? e : [""].concat(e).map((t) => {
    const o = `${t}`;
    return o.indexOf("/") === -1 && o.indexOf("~") === -1 ? o : o.replace(/~/g, "~0").replace(/\//g, "~1");
  }).join("/");
}
function Se(e, n) {
  for (let t = 0; t < n.length - 1; t += 1) {
    const o = n[t];
    if (e = P(F(e) === 3 ? Array.from(e) : e, o), typeof e != "object")
      throw new Error(`Cannot resolve patch at '${n.join("/")}'.`);
  }
  return e;
}
function je(e) {
  const n = Object.create(Object.getPrototypeOf(e));
  return Reflect.ownKeys(e).forEach((t) => {
    let o = Reflect.getOwnPropertyDescriptor(e, t);
    if (o.enumerable && o.configurable && o.writable) {
      n[t] = e[t];
      return;
    }
    o.writable || (o.writable = !0, o.configurable = !0), (o.get || o.set) && (o = {
      configurable: !0,
      writable: !0,
      enumerable: o.enumerable,
      value: e[t]
    }), Reflect.defineProperty(n, t, o);
  }), n;
}
const ze = Object.prototype.propertyIsEnumerable;
function be(e, n) {
  let t;
  if (Array.isArray(e))
    return Array.prototype.concat.call(e);
  if (e instanceof Set) {
    if (!k(e)) {
      const o = Object.getPrototypeOf(e).constructor;
      return new o(e.values());
    }
    return Set.prototype.difference ? Set.prototype.difference.call(e, /* @__PURE__ */ new Set()) : new Set(e.values());
  } else if (e instanceof Map) {
    if (!ee(e)) {
      const o = Object.getPrototypeOf(e).constructor;
      return new o(e);
    }
    return new Map(e);
  } else if (n?.mark && (t = n.mark(e, m), t !== void 0) && t !== m.mutable) {
    if (t === m.immutable)
      return je(e);
    if (typeof t == "function") {
      if (n.enablePatches || n.enableAutoFreeze)
        throw new Error("You can't use mark and patches or auto freeze together.");
      return t();
    }
    throw new Error(`Unsupported mark result: ${t}`);
  } else if (typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype) {
    const o = {};
    return Object.keys(e).forEach((r) => {
      o[r] = e[r];
    }), Object.getOwnPropertySymbols(e).forEach((r) => {
      ze.call(e, r) && (o[r] = e[r]);
    }), o;
  } else
    throw new Error("Please check mark() to ensure that it is a stable marker draftable function.");
}
function y(e) {
  e.copy || (e.copy = be(e.original, e.options));
}
function T(e) {
  if (!M(e))
    return ne(e);
  if (Array.isArray(e))
    return e.map(T);
  if (e instanceof Map) {
    const t = Array.from(e.entries()).map(([o, r]) => [
      o,
      T(r)
    ]);
    if (!ee(e)) {
      const o = Object.getPrototypeOf(e).constructor;
      return new o(t);
    }
    return new Map(t);
  }
  if (e instanceof Set) {
    const t = Array.from(e).map(T);
    if (!k(e)) {
      const o = Object.getPrototypeOf(e).constructor;
      return new o(t);
    }
    return new Set(t);
  }
  const n = Object.create(Object.getPrototypeOf(e));
  for (const t in e)
    n[t] = T(e[t]);
  return n;
}
function U(e) {
  return x(e) ? T(e) : e;
}
function j(e) {
  var n;
  e.assignedMap = (n = e.assignedMap) !== null && n !== void 0 ? n : /* @__PURE__ */ new Map(), e.operated || (e.operated = !0, e.parent && j(e.parent));
}
function ae() {
  throw new Error("Cannot modify frozen object");
}
function C(e, n, t, o, r) {
  {
    t = t ?? /* @__PURE__ */ new WeakMap(), o = o ?? [], r = r ?? [];
    const i = t.has(e) ? t.get(e) : e;
    if (o.length > 0) {
      const s = o.indexOf(i);
      if (i && typeof i == "object" && s !== -1)
        throw o[0] === i ? new Error("Forbids circular reference") : new Error(`Forbids circular reference: ~/${r.slice(0, s).map((l, f) => {
          if (typeof l == "symbol")
            return `[${l.toString()}]`;
          const a = o[f];
          return typeof l == "object" && (a instanceof Map || a instanceof Set) ? Array.from(a.keys()).indexOf(l) : l;
        }).join("/")}`);
      o.push(i), r.push(n);
    } else
      o.push(i);
  }
  if (Object.isFrozen(e) || x(e)) {
    o.pop(), r.pop();
    return;
  }
  switch (F(e)) {
    case 2:
      for (const [s, l] of e)
        C(s, s, t, o, r), C(l, s, t, o, r);
      e.set = e.clear = e.delete = ae;
      break;
    case 3:
      for (const s of e)
        C(s, s, t, o, r);
      e.add = e.clear = e.delete = ae;
      break;
    case 1:
      Object.freeze(e);
      let i = 0;
      for (const s of e)
        C(s, i, t, o, r), i += 1;
      break;
    default:
      Object.freeze(e), Object.keys(e).forEach((s) => {
        const l = e[s];
        C(l, s, t, o, r);
      });
  }
  o.pop(), r.pop();
}
function te(e, n) {
  const t = F(e);
  if (t === 0)
    Reflect.ownKeys(e).forEach((o) => {
      n(o, e[o], e);
    });
  else if (t === 1) {
    let o = 0;
    for (const r of e)
      n(o, r, e), o += 1;
  } else
    e.forEach((o, r) => n(r, o, e));
}
function we(e, n, t) {
  if (x(e) || !M(e, t) || n.has(e) || Object.isFrozen(e))
    return;
  const o = e instanceof Set, r = o ? /* @__PURE__ */ new Map() : void 0;
  if (n.add(e), te(e, (c, i) => {
    var s;
    if (x(i)) {
      const l = u(i);
      y(l);
      const f = !((s = l.assignedMap) === null || s === void 0) && s.size || l.operated ? l.copy : l.original;
      N(o ? r : e, c, f);
    } else
      we(i, n, t);
  }), r) {
    const c = e, i = Array.from(c);
    c.clear(), i.forEach((s) => {
      c.add(r.has(s) ? r.get(s) : s);
    });
  }
}
function Ee(e, n) {
  const t = e.type === 3 ? e.setMap : e.copy;
  e.finalities.revoke.length > 1 && e.assignedMap.get(n) && t && we(P(t, n), e.finalities.handledSet, e.options);
}
function G(e) {
  e.type === 3 && e.copy && (e.copy.clear(), e.setMap.forEach((n) => {
    e.copy.add(ne(n));
  }));
}
function J(e, n, t, o) {
  if (e.operated && e.assignedMap && e.assignedMap.size > 0 && !e.finalized) {
    if (t && o) {
      const c = ye(e);
      c && n(e, c, t, o);
    }
    e.finalized = !0;
  }
}
function oe(e, n, t, o) {
  const r = u(t);
  r && (r.callbacks || (r.callbacks = []), r.callbacks.push((c, i) => {
    var s;
    const l = e.type === 3 ? e.setMap : e.copy;
    if (E(P(l, n), t)) {
      let f = r.original;
      r.copy && (f = r.copy), G(e), J(e, o, c, i), e.options.enableAutoFreeze && (e.options.updatedValues = (s = e.options.updatedValues) !== null && s !== void 0 ? s : /* @__PURE__ */ new WeakMap(), e.options.updatedValues.set(f, r.original)), N(l, n, f);
    }
  }), e.options.enableAutoFreeze && r.finalities !== e.finalities && (e.options.enableAutoFreeze = !1)), M(t, e.options) && e.finalities.draft.push(() => {
    const c = e.type === 3 ? e.setMap : e.copy;
    E(P(c, n), t) && Ee(e, n);
  });
}
function Pe(e, n, t, o, r) {
  let { original: c, assignedMap: i, options: s } = e, l = e.copy;
  l.length < c.length && ([c, l] = [l, c], [t, o] = [o, t]);
  for (let f = 0; f < c.length; f += 1)
    if (i.get(f.toString()) && l[f] !== c[f]) {
      const a = n.concat([f]), p = D(a, r);
      t.push({
        op: h.Replace,
        path: p,
        // If it is a draft, it needs to be deep cloned, and it may also be non-draft.
        value: U(l[f])
      }), o.push({
        op: h.Replace,
        path: p,
        // If it is a draft, it needs to be deep cloned, and it may also be non-draft.
        value: U(c[f])
      });
    }
  for (let f = c.length; f < l.length; f += 1) {
    const a = n.concat([f]), p = D(a, r);
    t.push({
      op: h.Add,
      path: p,
      // If it is a draft, it needs to be deep cloned, and it may also be non-draft.
      value: U(l[f])
    });
  }
  if (c.length < l.length) {
    const { arrayLengthAssignment: f = !0 } = s.enablePatches;
    if (f) {
      const a = n.concat(["length"]), p = D(a, r);
      o.push({
        op: h.Replace,
        path: p,
        value: c.length
      });
    } else
      for (let a = l.length; c.length < a; a -= 1) {
        const p = n.concat([a - 1]), O = D(p, r);
        o.push({
          op: h.Remove,
          path: O
        });
      }
  }
}
function _e({ original: e, copy: n, assignedMap: t }, o, r, c, i) {
  t.forEach((s, l) => {
    const f = P(e, l), a = U(P(n, l)), p = s ? K(e, l) ? h.Replace : h.Add : h.Remove;
    if (E(f, a) && p === h.Replace)
      return;
    const O = o.concat(l), v = D(O, i);
    r.push(p === h.Remove ? { op: p, path: v } : { op: p, path: v, value: a }), c.push(p === h.Add ? { op: h.Remove, path: v } : p === h.Remove ? { op: h.Add, path: v, value: f } : { op: h.Replace, path: v, value: f });
  });
}
function Ae({ original: e, copy: n }, t, o, r, c) {
  let i = 0;
  e.forEach((s) => {
    if (!n.has(s)) {
      const l = t.concat([i]), f = D(l, c);
      o.push({
        op: h.Remove,
        path: f,
        value: s
      }), r.unshift({
        op: h.Add,
        path: f,
        value: s
      });
    }
    i += 1;
  }), i = 0, n.forEach((s) => {
    if (!e.has(s)) {
      const l = t.concat([i]), f = D(l, c);
      o.push({
        op: h.Add,
        path: f,
        value: s
      }), r.unshift({
        op: h.Remove,
        path: f,
        value: s
      });
    }
    i += 1;
  });
}
function $(e, n, t, o) {
  const { pathAsArray: r = !0 } = e.options.enablePatches;
  switch (e.type) {
    case 0:
    case 2:
      return _e(e, n, t, o, r);
    case 1:
      return Pe(e, n, t, o, r);
    case 3:
      return Ae(e, n, t, o, r);
  }
}
const Y = (e, n, t = !1) => {
  if (typeof e == "object" && e !== null && (!M(e, n) || t))
    throw new Error("Strict mode: Mutable data cannot be accessed directly, please use 'unsafe(callback)' wrap.");
}, Q = {
  get size() {
    return w(u(this)).size;
  },
  has(e) {
    return w(u(this)).has(e);
  },
  set(e, n) {
    const t = u(this), o = w(t);
    return (!o.has(e) || !E(o.get(e), n)) && (y(t), j(t), t.assignedMap.set(e, !0), t.copy.set(e, n), oe(t, e, n, $)), this;
  },
  delete(e) {
    if (!this.has(e))
      return !1;
    const n = u(this);
    return y(n), j(n), n.original.has(e) ? n.assignedMap.set(e, !1) : n.assignedMap.delete(e), n.copy.delete(e), !0;
  },
  clear() {
    const e = u(this);
    if (this.size) {
      y(e), j(e), e.assignedMap = /* @__PURE__ */ new Map();
      for (const [n] of e.original)
        e.assignedMap.set(n, !1);
      e.copy.clear();
    }
  },
  forEach(e, n) {
    const t = u(this);
    w(t).forEach((o, r) => {
      e.call(n, this.get(r), r, this);
    });
  },
  get(e) {
    var n, t;
    const o = u(this), r = w(o).get(e), c = ((t = (n = o.options).mark) === null || t === void 0 ? void 0 : t.call(n, r, m)) === m.mutable;
    if (o.options.strict && Y(r, o.options, c), c || o.finalized || !M(r, o.options) || r !== o.original.get(e))
      return r;
    const i = g.createDraft({
      original: r,
      parentDraft: o,
      key: e,
      finalities: o.finalities,
      options: o.options
    });
    return y(o), o.copy.set(e, i), i;
  },
  keys() {
    return w(u(this)).keys();
  },
  values() {
    const e = this.keys();
    return {
      [H]: () => this.values(),
      next: () => {
        const n = e.next();
        return n.done ? n : {
          done: !1,
          value: this.get(n.value)
        };
      }
    };
  },
  entries() {
    const e = this.keys();
    return {
      [H]: () => this.entries(),
      next: () => {
        const n = e.next();
        if (n.done)
          return n;
        const t = this.get(n.value);
        return {
          done: !1,
          value: [n.value, t]
        };
      }
    };
  },
  [H]() {
    return this.entries();
  }
}, De = Reflect.ownKeys(Q), ue = (e, n, { isValuesIterator: t }) => () => {
  var o, r;
  const c = n.next();
  if (c.done)
    return c;
  const i = c.value;
  let s = e.setMap.get(i);
  const l = u(s), f = ((r = (o = e.options).mark) === null || r === void 0 ? void 0 : r.call(o, s, m)) === m.mutable;
  if (e.options.strict && Y(i, e.options, f), !f && !l && M(i, e.options) && !e.finalized && e.original.has(i)) {
    const a = g.createDraft({
      original: i,
      parentDraft: e,
      key: i,
      finalities: e.finalities,
      options: e.options
    });
    e.setMap.set(i, a), s = a;
  } else l && (s = l.proxy);
  return {
    done: !1,
    value: t ? s : [s, s]
  };
}, B = {
  get size() {
    return u(this).setMap.size;
  },
  has(e) {
    const n = u(this);
    if (n.setMap.has(e))
      return !0;
    y(n);
    const t = u(e);
    return !!(t && n.setMap.has(t.original));
  },
  add(e) {
    const n = u(this);
    return this.has(e) || (y(n), j(n), n.assignedMap.set(e, !0), n.setMap.set(e, e), oe(n, e, e, $)), this;
  },
  delete(e) {
    if (!this.has(e))
      return !1;
    const n = u(this);
    y(n), j(n);
    const t = u(e);
    return t && n.setMap.has(t.original) ? (n.assignedMap.set(t.original, !1), n.setMap.delete(t.original)) : (!t && n.setMap.has(e) ? n.assignedMap.set(e, !1) : n.assignedMap.delete(e), n.setMap.delete(e));
  },
  clear() {
    if (!this.size)
      return;
    const e = u(this);
    y(e), j(e);
    for (const n of e.original)
      e.assignedMap.set(n, !1);
    e.setMap.clear();
  },
  values() {
    const e = u(this);
    y(e);
    const n = e.setMap.keys();
    return {
      [Symbol.iterator]: () => this.values(),
      next: ue(e, n, { isValuesIterator: !0 })
    };
  },
  entries() {
    const e = u(this);
    y(e);
    const n = e.setMap.keys();
    return {
      [Symbol.iterator]: () => this.entries(),
      next: ue(e, n, {
        isValuesIterator: !1
      })
    };
  },
  keys() {
    return this.values();
  },
  [H]() {
    return this.values();
  },
  forEach(e, n) {
    const t = this.values();
    let o = t.next();
    for (; !o.done; )
      e.call(n, o.value, o.value, this), o = t.next();
  }
};
Set.prototype.difference && Object.assign(B, {
  intersection(e) {
    return Set.prototype.intersection.call(new Set(this.values()), e);
  },
  union(e) {
    return Set.prototype.union.call(new Set(this.values()), e);
  },
  difference(e) {
    return Set.prototype.difference.call(new Set(this.values()), e);
  },
  symmetricDifference(e) {
    return Set.prototype.symmetricDifference.call(new Set(this.values()), e);
  },
  isSubsetOf(e) {
    return Set.prototype.isSubsetOf.call(new Set(this.values()), e);
  },
  isSupersetOf(e) {
    return Set.prototype.isSupersetOf.call(new Set(this.values()), e);
  },
  isDisjointFrom(e) {
    return Set.prototype.isDisjointFrom.call(new Set(this.values()), e);
  }
});
const xe = Reflect.ownKeys(B), me = /* @__PURE__ */ new WeakSet(), ve = {
  get(e, n, t) {
    var o, r;
    const c = (o = e.copy) === null || o === void 0 ? void 0 : o[n];
    if (c && me.has(c))
      return c;
    if (n === de)
      return e;
    let i;
    if (e.options.mark) {
      const f = n === "size" && (e.original instanceof Map || e.original instanceof Set) ? Reflect.get(e.original, n) : Reflect.get(e.original, n, t);
      if (i = e.options.mark(f, m), i === m.mutable)
        return e.options.strict && Y(f, e.options, !0), f;
    }
    const s = w(e);
    if (s instanceof Map && De.includes(n)) {
      if (n === "size")
        return Object.getOwnPropertyDescriptor(Q, "size").get.call(e.proxy);
      const f = Q[n];
      if (f)
        return f.bind(e.proxy);
    }
    if (s instanceof Set && xe.includes(n)) {
      if (n === "size")
        return Object.getOwnPropertyDescriptor(B, "size").get.call(e.proxy);
      const f = B[n];
      if (f)
        return f.bind(e.proxy);
    }
    if (!K(s, n)) {
      const f = fe(s, n);
      return f ? "value" in f ? f.value : (
        // !case: support for getter
        (r = f.get) === null || r === void 0 ? void 0 : r.call(e.proxy)
      ) : void 0;
    }
    const l = s[n];
    if (e.options.strict && Y(l, e.options), e.finalized || !M(l, e.options))
      return l;
    if (l === X(e.original, n)) {
      if (y(e), e.copy[n] = re({
        original: e.original[n],
        parentDraft: e,
        key: e.type === 1 ? Number(n) : n,
        finalities: e.finalities,
        options: e.options
      }), typeof i == "function") {
        const f = u(e.copy[n]);
        return y(f), j(f), f.copy;
      }
      return e.copy[n];
    }
    return l;
  },
  set(e, n, t) {
    var o;
    if (e.type === 3 || e.type === 2)
      throw new Error("Map/Set draft does not support any property assignment.");
    let r;
    if (e.type === 1 && n !== "length" && !(Number.isInteger(r = Number(n)) && r >= 0 && (n === 0 || r === 0 || String(r) === String(n))))
      throw new Error("Only supports setting array indices and the 'length' property.");
    const c = fe(w(e), n);
    if (c?.set)
      return c.set.call(e.proxy, t), !0;
    const i = X(w(e), n), s = u(i);
    return s && E(s.original, t) ? (e.copy[n] = t, e.assignedMap = (o = e.assignedMap) !== null && o !== void 0 ? o : /* @__PURE__ */ new Map(), e.assignedMap.set(n, !1), !0) : (E(t, i) && (t !== void 0 || K(e.original, n)) || (y(e), j(e), K(e.original, n) && E(t, e.original[n]) ? e.assignedMap.delete(n) : e.assignedMap.set(n, !0), e.copy[n] = t, oe(e, n, t, $)), !0);
  },
  has(e, n) {
    return n in w(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(w(e));
  },
  getOwnPropertyDescriptor(e, n) {
    const t = w(e), o = Reflect.getOwnPropertyDescriptor(t, n);
    return o && {
      writable: !0,
      configurable: e.type !== 1 || n !== "length",
      enumerable: o.enumerable,
      value: t[n]
    };
  },
  getPrototypeOf(e) {
    return Reflect.getPrototypeOf(e.original);
  },
  setPrototypeOf() {
    throw new Error("Cannot call 'setPrototypeOf()' on drafts");
  },
  defineProperty() {
    throw new Error("Cannot call 'defineProperty()' on drafts");
  },
  deleteProperty(e, n) {
    var t;
    return e.type === 1 ? ve.set.call(this, e, n, void 0, e.proxy) : (X(e.original, n) !== void 0 || n in e.original ? (y(e), j(e), e.assignedMap.set(n, !1)) : (e.assignedMap = (t = e.assignedMap) !== null && t !== void 0 ? t : /* @__PURE__ */ new Map(), e.assignedMap.delete(n)), e.copy && delete e.copy[n], !0);
  }
};
function re(e) {
  const { original: n, parentDraft: t, key: o, finalities: r, options: c } = e, i = F(n), s = {
    type: i,
    finalized: !1,
    parent: t,
    original: n,
    copy: null,
    proxy: null,
    finalities: r,
    options: c,
    // Mapping of draft Set items to their corresponding draft values.
    setMap: i === 3 ? new Map(n.entries()) : void 0
  };
  (o || "key" in e) && (s.key = o);
  const { proxy: l, revoke: f } = Proxy.revocable(i === 1 ? Object.assign([], s) : s, ve);
  if (r.revoke.push(f), me.add(l), s.proxy = l, t) {
    const a = t;
    a.finalities.draft.push((p, O) => {
      var v, I;
      const ce = u(l);
      let _ = a.type === 3 ? a.setMap : a.copy;
      const R = P(_, o), b = u(R);
      if (b) {
        let S = b.original;
        b.operated && (S = ne(R)), G(b), J(b, $, p, O), a.options.enableAutoFreeze && (a.options.updatedValues = (v = a.options.updatedValues) !== null && v !== void 0 ? v : /* @__PURE__ */ new WeakMap(), a.options.updatedValues.set(S, b.original)), N(_, o, S);
      }
      (I = ce.callbacks) === null || I === void 0 || I.forEach((S) => {
        S(p, O);
      });
    });
  } else {
    const a = u(l);
    a.finalities.draft.push((p, O) => {
      G(a), J(a, $, p, O);
    });
  }
  return l;
}
g.createDraft = re;
function Fe(e, n, t, o, r) {
  var c;
  const i = u(e), s = (c = i?.original) !== null && c !== void 0 ? c : e, l = !!n.length;
  if (i?.operated)
    for (; i.finalities.draft.length > 0; )
      i.finalities.draft.pop()(t, o);
  const f = l ? n[0] : i ? i.operated ? i.copy : i.original : e;
  return i && q(i), r && C(f, f, i?.options.updatedValues), [
    f,
    t && l ? [{ op: h.Replace, path: [], value: n[0] }] : t,
    o && l ? [{ op: h.Replace, path: [], value: s }] : o
  ];
}
function Ce(e, n) {
  var t;
  const o = {
    draft: [],
    revoke: [],
    handledSet: /* @__PURE__ */ new WeakSet()
  };
  let r, c;
  n.enablePatches && (r = [], c = []);
  const s = ((t = n.mark) === null || t === void 0 ? void 0 : t.call(n, e, m)) === m.mutable || !M(e, n) ? e : re({
    original: e,
    parentDraft: null,
    finalities: o,
    options: n
  });
  return [
    s,
    (l = []) => {
      const [f, a, p] = Fe(s, l, r, c, n.enableAutoFreeze);
      return n.enablePatches ? [f, a, p] : f;
    }
  ];
}
function Z(e) {
  const { rootDraft: n, value: t, useRawReturn: o = !1, isRoot: r = !0 } = e;
  te(t, (c, i, s) => {
    const l = u(i);
    if (l && n && l.finalities === n.finalities) {
      e.isContainDraft = !0;
      const f = l.original;
      if (s instanceof Set) {
        const a = Array.from(s);
        s.clear(), a.forEach((p) => s.add(c === p ? f : p));
      } else
        N(s, c, f);
    } else typeof i == "object" && i !== null && (e.value = i, e.isRoot = !1, Z(e));
  }), r && (e.isContainDraft || console.warn("The return value does not contain any draft, please use 'rawReturn()' to wrap the return value to improve performance."), o && console.warn("The return value contains drafts, please don't use 'rawReturn()' to wrap the return value."));
}
function Me(e) {
  var n;
  const t = u(e);
  if (!M(e, t?.options))
    return e;
  const o = F(e);
  if (t && !t.operated)
    return t.original;
  let r;
  function c() {
    r = o === 2 ? ee(e) ? new Map(e) : new (Object.getPrototypeOf(e)).constructor(e) : o === 3 ? Array.from(t.setMap.values()) : be(e, t?.options);
  }
  if (t) {
    t.finalized = !0;
    try {
      c();
    } finally {
      t.finalized = !1;
    }
  } else
    r = e;
  if (te(r, (i, s) => {
    if (t && E(P(t.original, i), s))
      return;
    const l = Me(s);
    l !== s && (r === e && c(), N(r, i, l));
  }), o === 3) {
    const i = (n = t?.original) !== null && n !== void 0 ? n : r;
    return k(i) ? new Set(r) : new (Object.getPrototypeOf(i)).constructor(r);
  }
  return r;
}
function pe(e) {
  if (!x(e))
    throw new Error(`current() is only used for Draft, parameter: ${e}`);
  return Me(e);
}
const Ie = (e) => function n(t, o, r) {
  var c, i, s;
  if (typeof t == "function" && typeof o != "function")
    return function(d, ...z) {
      return n(d, (A) => t.call(this, A, ...z), o);
    };
  const l = t, f = o;
  let a = r;
  if (typeof o != "function" && (a = o), a !== void 0 && Object.prototype.toString.call(a) !== "[object Object]")
    throw new Error(`Invalid options: ${a}, 'options' should be an object.`);
  a = Object.assign(Object.assign({}, e), a);
  const p = x(l) ? pe(l) : l, O = Array.isArray(a.mark) ? (d, z) => {
    for (const A of a.mark) {
      if (typeof A != "function")
        throw new Error(`Invalid mark: ${A}, 'mark' should be a function.`);
      const V = A(d, z);
      if (V)
        return V;
    }
  } : a.mark, v = (c = a.enablePatches) !== null && c !== void 0 ? c : !1, I = (i = a.strict) !== null && i !== void 0 ? i : !1, _ = {
    enableAutoFreeze: (s = a.enableAutoFreeze) !== null && s !== void 0 ? s : !1,
    mark: O,
    strict: I,
    enablePatches: v
  };
  if (!M(p, _) && typeof p == "object" && p !== null)
    throw new Error("Invalid base state: create() only supports plain objects, arrays, Set, Map or using mark() to mark the state as immutable.");
  const [R, b] = Ce(p, _);
  if (typeof o != "function") {
    if (!M(p, _))
      throw new Error("Invalid base state: create() only supports plain objects, arrays, Set, Map or using mark() to mark the state as immutable.");
    return [R, b];
  }
  let S;
  try {
    S = f(R);
  } catch (d) {
    throw q(u(R)), d;
  }
  const le = (d) => {
    const z = u(R);
    if (!x(d)) {
      if (d !== void 0 && !E(d, R) && z?.operated)
        throw new Error("Either the value is returned as a new non-draft value, or only the draft is modified without returning any value.");
      const V = d?.[he];
      if (V) {
        const Re = V[0];
        return _.strict && typeof d == "object" && d !== null && Z({
          rootDraft: z,
          value: d,
          useRawReturn: !0
        }), b([Re]);
      }
      if (d !== void 0)
        return typeof d == "object" && d !== null && Z({ rootDraft: z, value: d }), b([d]);
    }
    if (d === R || d === void 0)
      return b([]);
    const A = u(d);
    if (_ === A.options) {
      if (A.operated)
        throw new Error("Cannot return a modified child draft.");
      return b([pe(d)]);
    }
    return b([d]);
  };
  return S instanceof Promise ? S.then(le, (d) => {
    throw q(u(R)), d;
  }) : le(S);
}, L = Ie();
function Ve(e) {
  if (arguments.length === 0)
    throw new Error("rawReturn() must be called with a value.");
  if (arguments.length > 1)
    throw new Error("rawReturn() must be called with one argument.");
  return e !== void 0 && (typeof e != "object" || e === null) && console.warn("rawReturn() must be called with an object(including plain object, arrays, Set, Map, etc.) or `undefined`, other types do not need to be returned via rawReturn()."), {
    [he]: [e]
  };
}
Object.prototype.constructor.toString();
function Te(e) {
  return L((t) => Ve([...t]))(e || []);
}
function Ke(e, n) {
  let [t, o] = L(e);
  return t.push(n), o();
}
function $e(e, n) {
  let [t, o] = L(e);
  return t.forEach((r, c) => {
    t[c] = payload(r);
  }), o();
}
function Ne(e, n) {
  let [t, o] = L(e);
  return t.forEach((r, c) => {
    payload(r) || t.splice(c, 1);
  }), o();
}
const ie = Te([1, 2, 3]), W = Ke(ie, 4), se = $e(W), Oe = Ne(W);
console.log(ie);
console.log(W);
console.log(W == ie);
console.log(se);
console.log(W == se);
console.log(Oe);
console.log(Oe == se);
