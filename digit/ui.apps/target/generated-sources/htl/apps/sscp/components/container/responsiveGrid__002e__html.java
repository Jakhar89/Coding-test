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

public final class responsiveGrid__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _dynamic_responsivegrid = getProperty("responsivegrid");
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
addSubTemplate("responsiveGrid", new RenderUnit() {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Sub-Template Body -------------------------------------------------------------------------

Object _dynamic_container = arguments.get("container");
Object _global_containerclass = null;
Object _dynamic_resource = bindings.get("resource");
_global_containerclass = renderContext.getObjectModel().resolveProperty(_dynamic_container, "containerClass");
out.write("\r\n    ");
{
    Object var_testvariable0 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "containerClass");
    if (renderContext.getObjectModel().toBoolean(var_testvariable0)) {
        out.write("\r\n        ");
_global_containerclass = ("cmp-container--" + renderContext.getObjectModel().toString(_global_containerclass));
        out.write("\r\n    ");
    }
}
out.write("\r\n    <div");
{
    Object var_attrvalue1 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "id");
    {
        Object var_attrcontent2 = renderContext.call("xss", var_attrvalue1, "attribute");
        {
            boolean var_shoulddisplayattr4 = (((null != var_attrcontent2) && (!"".equals(var_attrcontent2))) && ((!"".equals(var_attrvalue1)) && (!((Object)false).equals(var_attrvalue1))));
            if (var_shoulddisplayattr4) {
                out.write(" id");
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
{
    String var_attrcontent5 = ("cmp-container " + renderContext.getObjectModel().toString(renderContext.call("xss", _global_containerclass, "attribute")));
    out.write(" class=\"");
    out.write(renderContext.getObjectModel().toString(var_attrcontent5));
    out.write("\"");
}
{
    Object var_attrvalue6 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "accessibilityLabel");
    {
        Object var_attrcontent7 = renderContext.call("xss", var_attrvalue6, "attribute");
        {
            boolean var_shoulddisplayattr9 = (((null != var_attrcontent7) && (!"".equals(var_attrcontent7))) && ((!"".equals(var_attrvalue6)) && (!((Object)false).equals(var_attrvalue6))));
            if (var_shoulddisplayattr9) {
                out.write(" aria-label");
                {
                    boolean var_istrueattr8 = (var_attrvalue6.equals(true));
                    if (!var_istrueattr8) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent7));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
{
    Object var_attrvalue10 = renderContext.getObjectModel().resolveProperty(_dynamic_container, "roleAttribute");
    {
        Object var_attrcontent11 = renderContext.call("xss", var_attrvalue10, "attribute");
        {
            boolean var_shoulddisplayattr13 = (((null != var_attrcontent11) && (!"".equals(var_attrcontent11))) && ((!"".equals(var_attrvalue10)) && (!((Object)false).equals(var_attrvalue10))));
            if (var_shoulddisplayattr13) {
                out.write(" role");
                {
                    boolean var_istrueattr12 = (var_attrvalue10.equals(true));
                    if (!var_istrueattr12) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent11));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
{
    Object var_attrvalue14 = renderContext.call("xss", renderContext.getObjectModel().resolveProperty(_dynamic_container, "backgroundStyle"), "styleString");
    {
        boolean var_shoulddisplayattr17 = ((!"".equals(var_attrvalue14)) && (!((Object)false).equals(var_attrvalue14)));
        if (var_shoulddisplayattr17) {
            out.write(" style");
            {
                boolean var_istrueattr16 = (var_attrvalue14.equals(true));
                if (!var_istrueattr16) {
                    out.write("=\"");
                    out.write(renderContext.getObjectModel().toString(var_attrvalue14));
                    out.write("\"");
                }
            }
        }
    }
}
out.write(">\r\n        ");
{
    Object var_resourcecontent18 = renderContext.call("includeResource", _dynamic_resource, obj().with("resourceType", "wcm/foundation/components/responsivegrid"));
    out.write(renderContext.getObjectModel().toString(var_resourcecontent18));
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

