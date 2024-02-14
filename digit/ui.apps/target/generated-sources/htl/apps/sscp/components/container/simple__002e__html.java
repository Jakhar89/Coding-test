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

public final class simple__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _dynamic_simple = getProperty("simple");
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
addSubTemplate("simple", new RenderUnit() {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Sub-Template Body -------------------------------------------------------------------------

Object _dynamic_container = arguments.get("container");
Object _global_containerclass = null;
Object _dynamic_wcmmode = bindings.get("wcmmode");
Object _global_allowed = null;
Object _global_templates = null;
Object _global_isallowedapplicable = null;
Object _global_allowedtemplate = null;
Collection var_collectionvar21_list_coerced$ = null;
Object _dynamic_resource = bindings.get("resource");
_global_containerclass = renderContext.getObjectModel().resolveProperty(_dynamic_container, "containerClass");
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
out.write("\r\n    ");
_global_templates = renderContext.call("use", "core/wcm/components/commons/v1/templates.html", obj());
out.write("<div");
{
    Object var_attrvalue2 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "id");
    {
        Object var_attrcontent3 = renderContext.call("xss", var_attrvalue2, "attribute");
        {
            boolean var_shoulddisplayattr5 = (((null != var_attrcontent3) && (!"".equals(var_attrcontent3))) && ((!"".equals(var_attrvalue2)) && (!((Object)false).equals(var_attrvalue2))));
            if (var_shoulddisplayattr5) {
                out.write(" id");
                {
                    boolean var_istrueattr4 = (var_attrvalue2.equals(true));
                    if (!var_istrueattr4) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent3));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
{
    String var_attrcontent6 = ((("cmp-container " + renderContext.getObjectModel().toString(renderContext.call("xss", _global_containerclass, "attribute"))) + " ") + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.call("format", (renderContext.getObjectModel().toBoolean(renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "edit")) ? "{0}" : ""), obj().with("format", (new Object[] {renderContext.getObjectModel().resolveProperty(_global_allowed, "cssClass")}))), "attribute")));
    out.write(" class=\"");
    out.write(renderContext.getObjectModel().toString(var_attrcontent6));
    out.write("\"");
}
{
    Object var_attrvalue7 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "accessibilityLabel");
    {
        Object var_attrcontent8 = renderContext.call("xss", var_attrvalue7, "attribute");
        {
            boolean var_shoulddisplayattr10 = (((null != var_attrcontent8) && (!"".equals(var_attrcontent8))) && ((!"".equals(var_attrvalue7)) && (!((Object)false).equals(var_attrvalue7))));
            if (var_shoulddisplayattr10) {
                out.write(" aria-label");
                {
                    boolean var_istrueattr9 = (var_attrvalue7.equals(true));
                    if (!var_istrueattr9) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent8));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
{
    Object var_attrvalue11 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "roleAttribute");
    {
        Object var_attrcontent12 = renderContext.call("xss", var_attrvalue11, "attribute");
        {
            boolean var_shoulddisplayattr14 = (((null != var_attrcontent12) && (!"".equals(var_attrcontent12))) && ((!"".equals(var_attrvalue11)) && (!((Object)false).equals(var_attrvalue11))));
            if (var_shoulddisplayattr14) {
                out.write(" role");
                {
                    boolean var_istrueattr13 = (var_attrvalue11.equals(true));
                    if (!var_istrueattr13) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent12));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
{
    Object var_attrvalue15 = renderContext.call("xss", renderContext.getObjectModel().resolveProperty(_dynamic_container, "backgroundStyle"), "styleString");
    {
        boolean var_shoulddisplayattr18 = ((!"".equals(var_attrvalue15)) && (!((Object)false).equals(var_attrvalue15)));
        if (var_shoulddisplayattr18) {
            out.write(" style");
            {
                boolean var_istrueattr17 = (var_attrvalue15.equals(true));
                if (!var_istrueattr17) {
                    out.write("=\"");
                    out.write(renderContext.getObjectModel().toString(var_attrvalue15));
                    out.write("\"");
                }
            }
        }
    }
}
out.write(">\r\n        ");
_global_isallowedapplicable = renderContext.getObjectModel().resolveProperty(_global_allowed, "isApplicable");
if (renderContext.getObjectModel().toBoolean(_global_isallowedapplicable)) {
_global_allowedtemplate = renderContext.call("use", "allowedcomponents.html", obj());
    {
        Object var_templatevar19 = renderContext.getObjectModel().resolveProperty(_global_allowedtemplate, "allowedcomponents");
        {
            Object var_templateoptions20_field$_title = renderContext.getObjectModel().resolveProperty(_global_allowed, "title");
            {
                Object var_templateoptions20_field$_components = renderContext.getObjectModel().resolveProperty(_global_allowed, "components");
                {
                    java.util.Map var_templateoptions20 = obj().with("title", var_templateoptions20_field$_title).with("components", var_templateoptions20_field$_components);
                    callUnit(out, renderContext, var_templatevar19, var_templateoptions20);
                }
            }
        }
    }
}
out.write("\r\n        ");
{
    boolean var_testvariable28 = (!renderContext.getObjectModel().toBoolean(_global_isallowedapplicable));
    if (var_testvariable28) {
        {
            Object var_collectionvar21 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "items");
            {
                long var_size22 = ((var_collectionvar21_list_coerced$ == null ? (var_collectionvar21_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar21)) : var_collectionvar21_list_coerced$).size());
                {
                    boolean var_notempty23 = (var_size22 > 0);
                    if (var_notempty23) {
                        {
                            long var_end26 = var_size22;
                            {
                                boolean var_validstartstepend27 = (((0 < var_size22) && true) && (var_end26 > 0));
                                if (var_validstartstepend27) {
                                    if (var_collectionvar21_list_coerced$ == null) {
                                        var_collectionvar21_list_coerced$ = renderContext.getObjectModel().toCollection(var_collectionvar21);
                                    }
                                    long var_index29 = 0;
                                    for (Object item : var_collectionvar21_list_coerced$) {
                                        {
                                            boolean var_traversal31 = (((var_index29 >= 0) && (var_index29 <= var_end26)) && true);
                                            if (var_traversal31) {
                                                {
                                                    Object var_resourcecontent32 = renderContext.call("includeResource", renderContext.getObjectModel().resolveProperty(item, "path"), obj().with("decoration", true));
                                                    out.write(renderContext.getObjectModel().toString(var_resourcecontent32));
                                                }
                                            }
                                        }
                                        var_index29++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var_collectionvar21_list_coerced$ = null;
        }
    }
}
out.write("\r\n        ");
{
    boolean var_testvariable33 = ((!renderContext.getObjectModel().toBoolean(_global_isallowedapplicable)) && (!renderContext.getObjectModel().toBoolean(renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "disabled"))));
    if (var_testvariable33) {
        {
            Object var_resourcecontent34 = renderContext.call("includeResource", renderContext.getObjectModel().resolveProperty(_dynamic_resource, "path"), obj().with("cssClassName", "new section").with("decorationTagName", "div").with("appendPath", "/*").with("resourceType", "core/wcm/components/container/v1/container/new"));
            out.write(renderContext.getObjectModel().toString(var_resourcecontent34));
        }
    }
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

