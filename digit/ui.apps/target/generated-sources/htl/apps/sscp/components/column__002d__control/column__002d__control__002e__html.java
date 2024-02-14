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
package apps.sscp.components.column__002d__control;

import java.io.PrintWriter;
import java.util.Collection;
import javax.script.Bindings;

import org.apache.sling.scripting.sightly.render.RenderUnit;
import org.apache.sling.scripting.sightly.render.RenderContext;

public final class column__002d__control__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _global_container = null;
Object _dynamic_wcmmode = bindings.get("wcmmode");
Object _dynamic_component = bindings.get("component");
Collection var_collectionvar5_list_coerced$ = null;
Object _global_columnclass = null;
Object _global_parsyspath = null;
_global_container = renderContext.call("use", com.sscp.core.models.ColumnControl.class.getName(), obj());
out.write("\r\n");
{
    Object var_testvariable0 = ((renderContext.getObjectModel().toBoolean(renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "edit")) ? renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "edit") : renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "design")));
    if (renderContext.getObjectModel().toBoolean(var_testvariable0)) {
        out.write("\r\n    <div class=\"cq-placeholder\"");
        {
            Object var_attrvalue1 = renderContext.getObjectModel().resolveProperty(_dynamic_component, "title");
            {
                Object var_attrcontent2 = renderContext.call("xss", var_attrvalue1, "attribute");
                {
                    boolean var_shoulddisplayattr4 = (((null != var_attrcontent2) && (!"".equals(var_attrcontent2))) && ((!"".equals(var_attrvalue1)) && (!((Object)false).equals(var_attrvalue1))));
                    if (var_shoulddisplayattr4) {
                        out.write(" data-emptyText");
                        {
                            boolean var_istrueattr3 = (var_attrvalue1.equals(true));
                            if (!var_istrueattr3) {
                                out.write("=\"");
                                out.write(renderContext.getObjectModel().toString(var_attrcontent2));
                                out.write("\"");
                            }
                        }
                    }
                }
            }
        }
        out.write("> </div>\r\n");
    }
}
out.write("\r\n\r\n<div class=\"aem-Grid aem-Grid--12\">\r\n   ");
{
    Object var_collectionvar5 = renderContext.getObjectModel().resolveProperty(_global_container, "layoutConfigList");
    {
        long var_size6 = ((var_collectionvar5_list_coerced$ == null ? (var_collectionvar5_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar5)) : var_collectionvar5_list_coerced$).size());
        {
            boolean var_notempty7 = (var_size6 > 0);
            if (var_notempty7) {
                {
                    long var_end10 = var_size6;
                    {
                        boolean var_validstartstepend11 = (((0 < var_size6) && true) && (var_end10 > 0));
                        if (var_validstartstepend11) {
                            if (var_collectionvar5_list_coerced$ == null) {
                                var_collectionvar5_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar5);
                            }
                            long var_index12 = 0;
                            for (Object item : var_collectionvar5_list_coerced$) {
                                {
                                    boolean itemlist_field$_middle = (!((var_index12 == 0) || (var_index12 == (renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.SUB.eval(var_size6, 1)).longValue()))));
                                    {
                                        boolean itemlist_field$_last = (var_index12 == (renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.SUB.eval(var_size6, 1)).longValue()));
                                        {
                                            boolean itemlist_field$_even = ((renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.REM.eval(var_index12, 2)).longValue()) == 1);
                                            {
                                                long itemlist_field$_count = (renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.ADD.eval(var_index12, 1)).longValue());
                                                {
                                                    long itemlist_field$_index = var_index12;
                                                    {
                                                        boolean itemlist_field$_first = (var_index12 == 0);
                                                        {
                                                            boolean itemlist_field$_odd = ((renderContext.getObjectModel().toNumber(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.REM.eval(var_index12, 2)).longValue()) == 0);
                                                            {
                                                                java.util.Map itemlist = obj().with("middle", itemlist_field$_middle).with("last", itemlist_field$_last).with("even", itemlist_field$_even).with("count", itemlist_field$_count).with("index", itemlist_field$_index).with("first", itemlist_field$_first).with("odd", itemlist_field$_odd);
                                                                {
                                                                    boolean var_traversal14 = (((var_index12 >= 0) && (var_index12 <= var_end10)) && true);
                                                                    if (var_traversal14) {
                                                                        out.write("\r\n      ");
_global_columnclass = renderContext.call("format", "aem-GridColumn aem-GridColumn--phone--12 aem-GridColumn--offset--phone--0 aem-GridColumn--offset--default--{0} aem-GridColumn--default--{1}", obj().with("format", (new Object[] {renderContext.getObjectModel().resolveProperty(item, "offset"), renderContext.getObjectModel().resolveProperty(item, "col")})));
                                                                        out.write("\r\n      ");
_global_parsyspath = renderContext.call("format", "column_{0}", obj().with("format", (new Object[] {itemlist.get("index")})));
                                                                        out.write("\r\n      ");
                                                                        {
                                                                            Object var_resourcecontent15 = renderContext.call("includeResource", _global_parsyspath, obj().with("cssClassName", _global_columnclass).with("decorationTagName", "div").with("resourceType", "wcm/foundation/components/responsivegrid"));
                                                                            out.write(renderContext.getObjectModel().toString(var_resourcecontent15));
                                                                        }
                                                                        out.write("\r\n   ");
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
                                var_index12++;
                            }
                        }
                    }
                }
            }
        }
    }
    var_collectionvar5_list_coerced$ = null;
}
out.write("\r\n</div>\r\n");


// End Of Main Template Body ----------------------------------------------------------------------
    }



    {
//Sub-Templates Initialization --------------------------------------------------------------------



//End of Sub-Templates Initialization -------------------------------------------------------------
    }

}

