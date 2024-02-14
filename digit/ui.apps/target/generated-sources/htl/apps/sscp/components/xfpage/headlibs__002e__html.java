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
package apps.sscp.components.xfpage;

import java.io.PrintWriter;
import java.util.Collection;
import javax.script.Bindings;

import org.apache.sling.scripting.sightly.render.RenderUnit;
import org.apache.sling.scripting.sightly.render.RenderContext;

public final class headlibs__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _dynamic_headlibs = getProperty("headlibs");
out.write("\r\n");
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
addSubTemplate("headlibs", new RenderUnit() {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Sub-Template Body -------------------------------------------------------------------------

Object _global_clientlib = null;
Object _dynamic_designpath = arguments.get("designpath");
Object _global_head = null;
_global_clientlib = renderContext.call("use", "/apps/granite/sightly/templates/clientlib.html", obj());
_global_head = renderContext.call("use", "headlibs.js", obj().with("designPath", _dynamic_designpath));
out.write("\r\n    ");
{
    Object var_templatevar0 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "all");
    {
        String var_templateoptions1_field$_categories = "cq.foundation-main";
        {
            java.util.Map var_templateoptions1 = obj().with("categories", var_templateoptions1_field$_categories);
            callUnit(out, renderContext, var_templatevar0, var_templateoptions1);
        }
    }
}
out.write("\r\n    ");
{
    Object var_testvariable2 = renderContext.getObjectModel().resolveProperty(_global_head, "staticDesign");
    if (renderContext.getObjectModel().toBoolean(var_testvariable2)) {
        out.write("<link");
        {
            Object var_attrvalue3 = renderContext.getObjectModel().resolveProperty(_global_head, "staticDesign");
            {
                Object var_attrcontent4 = renderContext.call("xss", var_attrvalue3, "uri");
                {
                    boolean var_shoulddisplayattr6 = (((null != var_attrcontent4) && (!"".equals(var_attrcontent4))) && ((!"".equals(var_attrvalue3)) && (!((Object)false).equals(var_attrvalue3))));
                    if (var_shoulddisplayattr6) {
                        out.write(" href");
                        {
                            boolean var_istrueattr5 = (var_attrvalue3.equals(true));
                            if (!var_istrueattr5) {
                                out.write("=\"");
                                out.write(renderContext.getObjectModel().toString(var_attrcontent4));
                                out.write("\"");
                            }
                        }
                    }
                }
            }
        }
        out.write(" rel=\"stylesheet\" type=\"text/css\"/>");
    }
}
out.write("\r\n    ");
{
    Object var_testvariable7 = renderContext.getObjectModel().resolveProperty(_global_head, "design");
    if (renderContext.getObjectModel().toBoolean(var_testvariable7)) {
        out.write("<link");
        {
            Object var_attrvalue8 = renderContext.getObjectModel().resolveProperty(_global_head, "design");
            {
                Object var_attrcontent9 = renderContext.call("xss", var_attrvalue8, "uri");
                {
                    boolean var_shoulddisplayattr11 = (((null != var_attrcontent9) && (!"".equals(var_attrcontent9))) && ((!"".equals(var_attrvalue8)) && (!((Object)false).equals(var_attrvalue8))));
                    if (var_shoulddisplayattr11) {
                        out.write(" href");
                        {
                            boolean var_istrueattr10 = (var_attrvalue8.equals(true));
                            if (!var_istrueattr10) {
                                out.write("=\"");
                                out.write(renderContext.getObjectModel().toString(var_attrcontent9));
                                out.write("\"");
                            }
                        }
                    }
                }
            }
        }
        out.write(" rel=\"stylesheet\" type=\"text/css\"/>");
    }
}
out.write("\r\n");


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

