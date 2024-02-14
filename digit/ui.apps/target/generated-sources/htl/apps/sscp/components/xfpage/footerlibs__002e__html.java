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

public final class footerlibs__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _global_wcminit = null;
Object _global_clientlib = null;
out.write("\r\n\r\n");
_global_wcminit = renderContext.call("use", "initwcm.js", obj());
_global_clientlib = renderContext.call("use", "/apps/granite/sightly/templates/clientlib.html", obj());
out.write("\r\n");
{
    boolean var_testvariable0 = (!(org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.leq(renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(_global_wcminit, "templateCategories"), "length"), 0)));
    if (var_testvariable0) {
        {
            Object var_templatevar1 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "js");
            {
                Object var_templateoptions2_field$_categories = renderContext.getObjectModel().resolveProperty(_global_wcminit, "templateCategories");
                {
                    java.util.Map var_templateoptions2 = obj().with("categories", var_templateoptions2_field$_categories);
                    callUnit(out, renderContext, var_templatevar1, var_templateoptions2);
                }
            }
        }
    }
}
out.write("\r\n");
{
    Object var_includedresult3 = renderContext.call("include", "customfooterlibs.html", obj());
    out.write(renderContext.getObjectModel().toString(var_includedresult3));
}


// End Of Main Template Body ----------------------------------------------------------------------
    }



    {
//Sub-Templates Initialization --------------------------------------------------------------------



//End of Sub-Templates Initialization -------------------------------------------------------------
    }

}

