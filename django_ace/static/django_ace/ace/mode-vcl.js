define("ace/mode/vcl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var VCLHighlightRules = function() {

    this.$rules = {
        start: [{
            include: "#comment"
        }, {
            include: "#keyword-acl"
        }, {
            include: "#keyword-backend"
        }, {
            include: "#keyword-import"
        }, {
            include: "#keyword-sub"
        }, {
            include: "#keywords-others"
        }],
        "#backend-probe": [{
            token: [
                "meta.backend.probe.subkeys.string.vcl",
                "support.other.backend.probe.subkey.vcl",
                "meta.backend.probe.subkeys.string.vcl"
            ],
            regex: /(\.)(url)(\s*=)/,
            push: [{
                token: "meta.backend.probe.subkeys.string.vcl",
                regex: /;/,
                next: "pop"
            }, {
                include: "#quoted-string"
            }, {
                defaultToken: "meta.backend.probe.subkeys.string.vcl"
            }]
        }, {
            token: [
                "meta.backend.subkeys.time.vcl",
                "support.other.backend.probe.subkey.vcl",
                "meta.backend.subkeys.time.vcl"
            ],
            regex: /(\.)(timeout|interval)(\s*=)/,
            push: [{
                token: "meta.backend.subkeys.time.vcl",
                regex: /;/,
                next: "pop"
            }, {
                include: "#time-spec"
            }, {
                defaultToken: "meta.backend.subkeys.time.vcl"
            }]
        }, {
            token: [
                "meta.backend.subkeys.number.vcl",
                "support.other.backend.probe.subkey.vcl",
                "meta.backend.subkeys.number.vcl"
            ],
            regex: /(\.)(window|threshold)(\s*=)/,
            push: [{
                token: "meta.backend.subkeys.number.vcl",
                regex: /;/,
                next: "pop"
            }, {
                include: "#number-spec"
            }, {
                defaultToken: "meta.backend.subkeys.number.vcl"
            }]
        }],
        "#backend-subkeys": [{
            token: [
                "meta.backend.subkeys.string.vcl",
                "support.other.backend.subkey.vcl",
                "meta.backend.subkeys.string.vcl"
            ],
            regex: /(\.)(host|port)(\s*=)/,
            push: [{
                token: "meta.backend.subkeys.string.vcl",
                regex: /;/,
                next: "pop"
            }, {
                include: "#quoted-string"
            }, {
                defaultToken: "meta.backend.subkeys.string.vcl"
            }]
        }, {
            token: [
                "meta.backend.probe.vcl",
                "support.other.backend.probe.vcl",
                "meta.backend.probe.vcl"
            ],
            regex: /(\.)(probe)(\s*=\s*{)/,
            push: [{
                token: "meta.backend.probe.vcl",
                regex: /}/,
                next: "pop"
            }, {
                include: "#backend-probe"
            }, {
                defaultToken: "meta.backend.probe.vcl"
            }]
        }, {
            token: [
                "meta.backend.subkeys.time.vcl",
                "support.other.backend.subkey.vcl",
                "meta.backend.subkeys.time.vcl"
            ],
            regex: /(\.)(connect_timeout|first_byte_timeout|between_bytes_timeout)(\s*=)/,
            push: [{
                token: "meta.backend.subkeys.time.vcl",
                regex: /;/,
                next: "pop"
            }, {
                include: "#time-spec"
            }, {
                defaultToken: "meta.backend.subkeys.time.vcl"
            }]
        }],
        "#comment": [{
            token: "comment.block.vcl",
            regex: /\/\*/,
            push: [{
                token: "comment.block.vcl",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment.block.vcl"
            }]
        }, {
            token: "comment.line.vcl",
            regex: /#.*$/
        }],
        "#function-invocation": [{
            token: [
                "entity.name.function.vcl",
                "meta.control.function",
                "meta.control.function",
                "meta.control.function"
            ],
            regex: /\b(\S+)(\()(.*)(\))/
        }],
        "#keyword-acl": [{
            token: "keyword.other.vcl.acl",
            regex: /\bacl\b/
        }],
        "#keyword-backend": [{
            token: [
                "keyword.control.backend.vcl",
                "meta.backend.vcl",
                "entity.name.backend.vcl",
                "meta.backend.vcl"
            ],
            regex: /\b(backend)(\s+)([a-zA-Z0-9_]+)(\s*{)/,
            push: [{
                token: "meta.backend.vcl",
                regex: /}/,
                next: "pop"
            }, {
                include: "#backend-subkeys"
            }, {
                defaultToken: "meta.backend.vcl"
            }]
        }],
        "#keyword-import": [{
            token: [
                "keyword.control.backend.vcl",
                "meta.import.vcl",
                "entity.name.backend.vcl"
            ],
            regex: /\b(import)(\s+)([a-zA-Z0-9_]+)/
        }],
        "#keyword-sub": [{
            token: [
                "keyword.sub.vcl.action",
                "meta.sub.vcl",
                "entity.name.function.vcl",
                "meta.sub.vcl"
            ],
            regex: /\b(sub)(\s+)([a-zA-Z0-9_]+)(\s*{)/,
            push: [{
                token: "meta.sub.vcl",
                regex: /}/,
                next: "pop"
            }, {
                include: "#sub-body"
            }, {
                defaultToken: "meta.sub.vcl"
            }]
        }],
        "#keywords-others": [{
            token: "keyword.other.vcl",
            regex: /\b(?:director|probe)\b/
        }],
        "#number-spec": [{
            token: "constant.numeric.vcl",
            regex: /\d/
        }],
        "#quoted-string": [{
            token: "string.quoted.double.vcl",
            regex: /"/,
            push: [{
                token: "string.quoted.double.vcl",
                regex: /"/,
                next: "pop"
            }, {
                defaultToken: "string.quoted.double.vcl"
            }]
        }],
        "#sub-body": [{
            token: "keyword.control.vcl.action",
            regex: /\b(?:call|hash_data|panic|ban|ban_url|remove|return|rollback|set|synthetic|unset|purge|error)\b/
        }, {
            token: [
                "keyword.control.vcl.if",
                "meta.control.vcl.if",
                "meta.control.vcl.if",
                "meta.control.vcl.if",
                "meta.control.vcl.if"
            ],
            regex: /\b(if|elseif)(\s*\()(.+)(\)\s*)(\{\s*|$)/,
            push: [{
                token: "meta.control.vcl.if",
                regex: /}/,
                next: "pop"
            }, {
                include: "#sub-body"
            }, {
                defaultToken: "meta.control.vcl.if"
            }]
        }, {
            token: [
                "keyword.control.vcl.else",
                "meta.control.vcl.else",
                "meta.control.vcl.else"
            ],
            regex: /\b(else)(\s*)(\{\s*|$)/,
            push: [{
                token: "meta.control.vcl.else",
                regex: /}/,
                next: "pop"
            }, {
                include: "#sub-body"
            }, {
                defaultToken: "meta.control.vcl.else"
            }]
        }, {
            token: "constant.language.vcl",
            regex: /\b(?:regsub|regsuball|true|false)\b(?![?!])/
        }, {
            include: "#comment"
        }, {
            include: "#quoted-string"
        }],
        "#time-spec": [{
            token: "constant.numeric.time.vcl",
            regex: /\d+\s*(?:s|ms)/
        }]
    }
    
    this.normalizeRules();
};

VCLHighlightRules.metaData = {
    fileTypes: ["vcl"],
    foldingStartMarker: "^.*\\b(backend|sub)\\s*(\\w+\\s*)?(\\s*\\{[^\\}]*)?\\s*$",
    foldingStopMarker: "^\\s*\\}",
    keyEquivalent: "^~V",
    name: "VCL",
    scopeName: "source.varnish.vcl"
}


oop.inherits(VCLHighlightRules, TextHighlightRules);

exports.VCLHighlightRules = VCLHighlightRules;
});

define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

define("ace/mode/vcl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/vcl_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var VCLHighlightRules = require("./vcl_highlight_rules").VCLHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = VCLHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/vcl"
}).call(Mode.prototype);

exports.Mode = Mode;
});
