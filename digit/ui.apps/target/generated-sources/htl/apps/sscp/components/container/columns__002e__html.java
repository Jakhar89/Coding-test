/*******************************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 ******************************************************************************/
package apps.sscp.components.container;

import java.io.PrintWriter;
import java.util.Collection;
import javax.script.Bindings;

import org.apache.sling.scripting.sightly.render.RenderUnit;
import org.apache.sling.scripting.sightly.render.RenderContext;

public final class columns__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _dynamic_columns = getProperty("columns");
out.write("\r\n");


// End Of Main Template Body ----------------------------------------------------------------------
    }



    {
//Sub-Templates Initialization --------------------------------------------------------------------

/*******************************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 ******************************************************************************/
addSubTemplate("columns", new RenderUnit() {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Sub-Template Body -------------------------------------------------------------------------

Object _dynamic_container = arguments.get("container");
Object _global_columnslayout = null;
Object _global_containerclass = null;
Object _global_gridcolumnsclasses = null;
Object _dynamic_wcmmode = bindings.get("wcmmode");
Object _global_allowed = null;
Collection var_collectionvar2_list_coerced$ = null;
Object _global_breakpointprefix = null;
Collection var_collectionvar29_list_coerced$ = null;
Object _global_columnclasses = null;
Collection var_collectionvar39_list_coerced$ = null;
Object _global_columnconfig = null;
Object _global_rowspan = null;
Object _global_columnspan = null;
Object _global_offset = null;
Object _global_isallowedapplicable = null;
Object _global_allowedtemplate = null;
Collection var_collectionvar56_list_coerced$ = null;
Object _global_columnname = null;
Object _dynamic_resource = bindings.get("resource");
Object _global_parsyspath = null;
_global_columnslayout = renderContext.getObjectModel().resolveProperty(_dynamic_container, "mappedColumnsLayout");
_global_containerclass = renderContext.getObjectModel().resolveProperty(_dynamic_container, "containerClass");
_global_gridcolumnsclasses = "";
out.write("\r\n    ");
{
    Object var_testvariable0 = renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "edit");
    if (renderContext.getObjectModel().toBoolean(var_testvariable0)) {
_global_allowed = renderContext.call("use", "com.day.cq.wcm.foundation.AllowedComponentList", obj());
    }
}
out.write("\r\n    ");
{
    Object var_testvariable1 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "containerClass");
    if (renderContext.getObjectModel().toBoolean(var_testvariable1)) {
        out.write("\r\n        ");
_global_containerclass = ("cmp-container--" + renderContext.getObjectModel().toString(_global_containerclass));
        out.write("\r\n    ");
    }
}
out.write("\r\n    \r\n    ");
{
    Object var_collectionvar2 = _global_columnslayout;
    {
        long var_size3 = ((var_collectionvar2_list_coerced$ == null ? (var_collectionvar2_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar2)) : var_collectionvar2_list_coerced$).size());
        {
            boolean var_notempty4 = (var_size3 > 0);
            if (var_notempty4) {
                {
                    long var_end7 = var_size3;
                    {
                        boolean var_validstartstepend8 = (((0 < var_size3) && true) && (var_end7 > 0));
                        if (var_validstartstepend8) {
                            if (var_collectionvar2_list_coerced$ == null) {
                                var_collectionvar2_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar2);
                            }
                            long var_index9 = 0;
                            for (Object layoutkey : var_collectionvar2_list_coerced$) {
                                {
                                    boolean var_traversal11 = (((var_index9 >= 0) && (var_index9 <= var_end7)) && true);
                                    if (var_traversal11) {
                                        out.write("\r\n        ");
_global_breakpointprefix = renderContext.call("format", ((org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.strictEq(layoutkey, "initial")) ? "" : "{0}:"), obj().with("format", (new Object[] {layoutkey})));
                                        out.write("\r\n        ");
_global_gridcolumnsclasses = renderContext.call("format", "{0} {1}grid-cols-{2}", obj().with("format", (new Object[] {_global_gridcolumnsclasses, _global_breakpointprefix, renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(_global_columnslayout, layoutkey), "displayColumns")})));
                                        out.write("\r\n    ");
                                    }
                                }
                                var_index9++;
                            }
                        }
                    }
                }
            }
        }
    }
    var_collectionvar2_list_coerced$ = null;
}
out.write("\r\n\r\n    <div");
{
    Object var_attrvalue12 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "id");
    {
        Object var_attrcontent13 = renderContext.call("xss", var_attrvalue12, "attribute");
        {
            boolean var_shoulddisplayattr15 = (((null != var_attrcontent13) && (!"".equals(var_attrcontent13))) && ((!"".equals(var_attrvalue12)) && (!((Object)false).equals(var_attrvalue12))));
            if (var_shoulddisplayattr15) {
                out.write(" id");
                {
                    boolean var_istrueattr14 = (var_attrvalue12.equals(true));
                    if (!var_istrueattr14) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent13));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
{
    String var_attrcontent16 = ((((("cmp-container " + renderContext.getObjectModel().toString(renderContext.call("xss", _global_containerclass, "attribute"))) + " cmp-container--columns grid ") + renderContext.getObjectModel().toString(renderContext.call("xss", _global_gridcolumnsclasses, "attribute"))) + " ") + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.call("format", (renderContext.getObjectModel().toBoolean(renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "edit")) ? "{0}" : ""), obj().with("format", (new Object[] {renderContext.getObjectModel().resolveProperty(_global_allowed, "cssClass")}))), "attribute")));
    out.write(" class=\"");
    out.write(renderContext.getObjectModel().toString(var_attrcontent16));
    out.write("\"");
}
{
    Object var_attrvalue17 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "accessibilityLabel");
    {
        Object var_attrcontent18 = renderContext.call("xss", var_attrvalue17, "attribute");
        {
            boolean var_shoulddisplayattr20 = (((null != var_attrcontent18) && (!"".equals(var_attrcontent18))) && ((!"".equals(var_attrvalue17)) && (!((Object)false).equals(var_attrvalue17))));
            if (var_shoulddisplayattr20) {
                out.write(" aria-label");
                {
                    boolean var_istrueattr19 = (var_attrvalue17.equals(true));
                    if (!var_istrueattr19) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent18));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
{
    Object var_attrvalue21 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "roleAttribute");
    {
        Object var_attrcontent22 = renderContext.call("xss", var_attrvalue21, "attribute");
        {
            boolean var_shoulddisplayattr24 = (((null != var_attrcontent22) && (!"".equals(var_attrcontent22))) && ((!"".equals(var_attrvalue21)) && (!((Object)false).equals(var_attrvalue21))));
            if (var_shoulddisplayattr24) {
                out.write(" role");
                {
                    boolean var_istrueattr23 = (var_attrvalue21.equals(true));
                    if (!var_istrueattr23) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent22));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
{
    Object var_attrvalue25 = renderContext.call("xss", renderContext.getObjectModel().resolveProperty(_dynamic_container, "backgroundStyle"), "styleString");
    {
        boolean var_shoulddisplayattr28 = ((!"".equals(var_attrvalue25)) && (!((Object)false).equals(var_attrvalue25)));
        if (var_shoulddisplayattr28) {
            out.write(" style");
            {
                boolean var_istrueattr27 = (var_attrvalue25.equals(true));
                if (!var_istrueattr27) {
                    out.write("=\"");
                    out.write(renderContext.getObjectModel().toString(var_attrvalue25));
                    out.write("\"");
                }
            }
        }
    }
}
out.write(">\r\n        ");
{
    Object var_collectionvar29 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "containerColumns");
    {
        long var_size30 = ((var_collectionvar29_list_coerced$ == null ? (var_collectionvar29_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar29)) : var_collectionvar29_list_coerced$).size());
        {
            boolean var_notempty31 = (var_size30 > 0);
            if (var_notempty31) {
                {
                    long var_end34 = var_size30;
                    {
                        boolean var_validstartstepend35 = (((0 < var_size30) && true) && (var_end34 > 0));
                        if (var_validstartstepend35) {
                            if (var_collectionvar29_list_coerced$ == null) {
                                var_collectionvar29_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar29);
                            }
                            long var_index36 = 0;
                            for (Object containercolumns : var_collectionvar29_list_coerced$) {
                                {
                                    boolean containercolumnslist_field$_middle = (!((var_index36 == 0) || (var_index36 == (renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.SUB.eval(var_size30, 1)).longValue()))));
                                    {
                                        boolean containercolumnslist_field$_last = (var_index36 == (renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.SUB.eval(var_size30, 1)).longValue()));
                                        {
                                            boolean containercolumnslist_field$_even = ((renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.REM.eval(var_index36, 2)).longValue()) == 1);
                                            {
                                                long containercolumnslist_field$_count = (renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.ADD.eval(var_index36, 1)).longValue());
                                                {
                                                    long containercolumnslist_field$_index = var_index36;
                                                    {
                                                        boolean containercolumnslist_field$_first = (var_index36 == 0);
                                                        {
                                                            boolean containercolumnslist_field$_odd = ((renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.REM.eval(var_index36, 2)).longValue()) == 0);
                                                            {
                                                                java.util.Map containercolumnslist = obj().with("middle", containercolumnslist_field$_middle).with("last", containercolumnslist_field$_last).with("even", containercolumnslist_field$_even).with("count", containercolumnslist_field$_count).with("index", containercolumnslist_field$_index).with("first", containercolumnslist_field$_first).with("odd", containercolumnslist_field$_odd);
                                                                {
                                                                    boolean var_traversal38 = (((var_index36 >= 0) && (var_index36 <= var_end34)) && true);
                                                                    if (var_traversal38) {
                                                                        out.write("\r\n            ");
_global_columnclasses = "";
                                                                        {
                                                                            Object var_collectionvar39 = _global_columnslayout;
                                                                            {
                                                                                long var_size40 = ((var_collectionvar39_list_coerced$ == null ? (var_collectionvar39_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar39)) : var_collectionvar39_list_coerced$).size());
                                                                                {
                                                                                    boolean var_notempty41 = (var_size40 > 0);
                                                                                    if (var_notempty41) {
                                                                                        {
                                                                                            long var_end44 = var_size40;
                                                                                            {
                                                                                                boolean var_validstartstepend45 = (((0 < var_size40) && true) && (var_end44 > 0));
                                                                                                if (var_validstartstepend45) {
                                                                                                    if (var_collectionvar39_list_coerced$ == null) {
                                                                                                        var_collectionvar39_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar39);
                                                                                                    }
                                                                                                    long var_index46 = 0;
                                                                                                    for (Object layoutkey : var_collectionvar39_list_coerced$) {
                                                                                                        {
                                                                                                            boolean var_traversal48 = (((var_index46 >= 0) && (var_index46 <= var_end44)) && true);
                                                                                                            if (var_traversal48) {
                                                                                                                out.write("\r\n                ");
_global_columnconfig = renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(_global_columnslayout, layoutkey), "columns"), containercolumnslist.get("index"));
                                                                                                                if (renderContext.getObjectModel().toBoolean(_global_columnconfig)) {
_global_breakpointprefix = renderContext.call("format", ((org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.strictEq(layoutkey, "initial")) ? "" : "{0}:"), obj().with("format", (new Object[] {layoutkey})));
                                                                                                                    out.write("\r\n                    \r\n                    ");
_global_rowspan = renderContext.getObjectModel().resolveProperty(_global_columnconfig, "rowSpan");
                                                                                                                    if (renderContext.getObjectModel().toBoolean(_global_rowspan)) {
_global_columnclasses = renderContext.call("format", "{0} {1}row-span-{2}", obj().with("format", (new Object[] {_global_columnclasses, _global_breakpointprefix, _global_rowspan})));
                                                                                                                    }
                                                                                                                    out.write("\r\n\r\n                    \r\n                    ");
_global_columnspan = renderContext.getObjectModel().resolveProperty(_global_columnconfig, "columnSpan");
                                                                                                                    if (renderContext.getObjectModel().toBoolean(_global_columnspan)) {
_global_columnclasses = renderContext.call("format", "{0} {1}col-span-{2}", obj().with("format", (new Object[] {_global_columnclasses, _global_breakpointprefix, _global_columnspan})));
                                                                                                                    }
                                                                                                                    out.write("\r\n\r\n                    \r\n                    ");
_global_offset = renderContext.getObjectModel().resolveProperty(_global_columnconfig, "offset");
                                                                                                                    if (renderContext.getObjectModel().toBoolean(_global_offset)) {
_global_columnclasses = renderContext.call("format", "{0} {1}col-start-{2} {1}col-end-{3}", obj().with("format", (new Object[] {_global_columnclasses, _global_breakpointprefix, renderContext.getObjectModel().resolveProperty(_global_offset, "start"), renderContext.getObjectModel().resolveProperty(_global_offset, "end")})));
                                                                                                                    }
                                                                                                                    out.write("\r\n                ");
                                                                                                                }
                                                                                                                out.write("\r\n            ");
                                                                                                            }
                                                                                                        }
                                                                                                        var_index46++;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                            var_collectionvar39_list_coerced$ = null;
                                                                        }
                                                                        out.write("\r\n\r\n            <div");
                                                                        {
                                                                            Object var_attrvalue49 = _global_columnclasses;
                                                                            {
                                                                                Object var_attrcontent50 = renderContext.call("xss", var_attrvalue49, "attribute");
                                                                                {
                                                                                    boolean var_shoulddisplayattr52 = (((null != var_attrcontent50) && (!"".equals(var_attrcontent50))) && ((!"".equals(var_attrvalue49)) && (!((Object)false).equals(var_attrvalue49))));
                                                                                    if (var_shoulddisplayattr52) {
                                                                                        out.write(" class");
                                                                                        {
                                                                                            boolean var_istrueattr51 = (var_attrvalue49.equals(true));
                                                                                            if (!var_istrueattr51) {
                                                                                                out.write("=\"");
                                                                                                out.write(renderContext.getObjectModel().toString(var_attrcontent50));
                                                                                                out.write("\"");
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        out.write(">\r\n                ");
_global_isallowedapplicable = renderContext.getObjectModel().resolveProperty(_global_allowed, "isApplicable");
                                                                        if (renderContext.getObjectModel().toBoolean(_global_isallowedapplicable)) {
                                                                            {
                                                                                Object var_testvariable53 = _global_isallowedapplicable;
                                                                                if (renderContext.getObjectModel().toBoolean(var_testvariable53)) {
_global_allowedtemplate = renderContext.call("use", "allowedcomponents.html", obj());
                                                                                    {
                                                                                        Object var_templatevar54 = renderContext.getObjectModel().resolveProperty(_global_allowedtemplate, "allowedcomponents");
                                                                                        {
                                                                                            Object var_templateoptions55_field$_title = renderContext.getObjectModel().resolveProperty(_global_allowed, "title");
                                                                                            {
                                                                                                Object var_templateoptions55_field$_components = renderContext.getObjectModel().resolveProperty(_global_allowed, "components");
                                                                                                {
                                                                                                    java.util.Map var_templateoptions55 = obj().with("title", var_templateoptions55_field$_title).with("components", var_templateoptions55_field$_components);
                                                                                                    callUnit(out, renderContext, var_templatevar54, var_templateoptions55);
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        out.write("\r\n                ");
                                                                        {
                                                                            boolean var_testvariable63 = (!renderContext.getObjectModel().toBoolean(_global_isallowedapplicable));
                                                                            if (var_testvariable63) {
                                                                                {
                                                                                    Object var_collectionvar56 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "items");
                                                                                    {
                                                                                        long var_size57 = ((var_collectionvar56_list_coerced$ == null ? (var_collectionvar56_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar56)) : var_collectionvar56_list_coerced$).size());
                                                                                        {
                                                                                            boolean var_notempty58 = (var_size57 > 0);
                                                                                            if (var_notempty58) {
                                                                                                {
                                                                                                    long var_end61 = var_size57;
                                                                                                    {
                                                                                                        boolean var_validstartstepend62 = (((0 < var_size57) && true) && (var_end61 > 0));
                                                                                                        if (var_validstartstepend62) {
                                                                                                            if (var_collectionvar56_list_coerced$ == null) {
                                                                                                                var_collectionvar56_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar56);
                                                                                                            }
                                                                                                            long var_index64 = 0;
                                                                                                            for (Object item : var_collectionvar56_list_coerced$) {
                                                                                                                {
                                                                                                                    boolean var_traversal66 = (((var_index64 >= 0) && (var_index64 <= var_end61)) && true);
                                                                                                                    if (var_traversal66) {
                                                                                                                        out.write("\r\n                    ");
_global_columnname = renderContext.call("format", "column_{0}", obj().with("format", (new Object[] {containercolumnslist.get("index")})));
                                                                                                                        {
                                                                                                                            boolean var_testvariable67 = (org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.strictEq(_global_columnname, renderContext.getObjectModel().resolveProperty(item, "name")));
                                                                                                                            if (var_testvariable67) {
                                                                                                                                {
                                                                                                                                    Object var_resourcecontent68 = renderContext.call("includeResource", renderContext.getObjectModel().resolveProperty(item, "path"), obj().with("decoration", false));
                                                                                                                                    out.write(renderContext.getObjectModel().toString(var_resourcecontent68));
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                        out.write("\r\n                ");
                                                                                                                    }
                                                                                                                }
                                                                                                                var_index64++;
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    var_collectionvar56_list_coerced$ = null;
                                                                                }
                                                                            }
                                                                        }
                                                                        out.write("\r\n                ");
                                                                        {
                                                                            boolean var_testvariable69 = ((!renderContext.getObjectModel().toBoolean(_global_isallowedapplicable)) && (!renderContext.getObjectModel().toBoolean(renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "disabled"))));
                                                                            if (var_testvariable69) {
_global_parsyspath = renderContext.call("format", "{0}/column_{1}", obj().with("format", (new Object[] {renderContext.getObjectModel().resolveProperty(_dynamic_resource, "path"), containercolumnslist.get("index")})));
                                                                                {
                                                                                    Object var_resourcecontent70 = renderContext.call("includeResource", _global_parsyspath, obj().with("cssClassName", "new section").with("decorationTagName", "div").with("appendPath", "/*").with("resourceType", "sscp/components/container/new"));
                                                                                    out.write(renderContext.getObjectModel().toString(var_resourcecontent70));
                                                                                }
                                                                            }
                                                                        }
                                                                        out.write("\r\n            </div>\r\n        ");
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                var_index36++;
                            }
                        }
                    }
                }
            }
        }
    }
    var_collectionvar29_list_coerced$ = null;
}
out.write("\r\n    </div>\r\n");


// End Of Main Sub-Template Body ------------------------------------------------------------------
    }



    {
//Sub-Sub-Templates Initialization ----------------------------------------------------------------



//End of Sub-Sub-Templates Initialization ---------------------------------------------------------
    }
    
});


//End of Sub-Templates Initialization -------------------------------------------------------------
    }

}

