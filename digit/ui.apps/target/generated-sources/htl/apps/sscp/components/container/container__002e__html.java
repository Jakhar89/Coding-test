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

public final class container__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _global_container = null;
Object _global_layout = null;
Object _global_responsivegridtemplate = null;
Object _global_simpletemplate = null;
Object _global_columnstemplate = null;
_global_container = renderContext.call("use", com.adobe.cq.wcm.core.components.models.LayoutContainer.class.getName(), obj());
_global_layout = renderContext.getObjectModel().resolveProperty(_global_container, "gridLayout");
out.write("\r\n  ");
{
    boolean var_testvariable0 = (org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.strictEq(_global_layout, "RESPONSIVE_GRID"));
    if (var_testvariable0) {
_global_responsivegridtemplate = renderContext.call("use", "responsiveGrid.html", obj());
        {
            Object var_templatevar1 = renderContext.getObjectModel().resolveProperty(_global_responsivegridtemplate, "responsiveGrid");
            {
                Object var_templateoptions2_field$_container = _global_container;
                {
                    java.util.Map var_templateoptions2 = obj().with("container", var_templateoptions2_field$_container);
                    callUnit(out, renderContext, var_templatevar1, var_templateoptions2);
                }
            }
        }
    }
}
out.write("\r\n  ");
{
    boolean var_testvariable3 = (org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.strictEq(_global_layout, "SIMPLE"));
    if (var_testvariable3) {
_global_simpletemplate = renderContext.call("use", "simple.html", obj());
        {
            Object var_templatevar4 = renderContext.getObjectModel().resolveProperty(_global_simpletemplate, "simple");
            {
                Object var_templateoptions5_field$_container = _global_container;
                {
                    java.util.Map var_templateoptions5 = obj().with("container", var_templateoptions5_field$_container);
                    callUnit(out, renderContext, var_templatevar4, var_templateoptions5);
                }
            }
        }
    }
}
out.write("\r\n  ");
{
    boolean var_testvariable6 = (org.apache.sling.scripting.sightly.compiler.expression.nodes.BinaryOperator.strictEq(_global_layout, "COLUMNS"));
    if (var_testvariable6) {
_global_columnstemplate = renderContext.call("use", "columns.html", obj());
        {
            Object var_templatevar7 = renderContext.getObjectModel().resolveProperty(_global_columnstemplate, "columns");
            {
                Object var_templateoptions8_field$_container = _global_container;
                {
                    java.util.Map var_templateoptions8 = obj().with("container", var_templateoptions8_field$_container);
                    callUnit(out, renderContext, var_templatevar7, var_templateoptions8);
                }
            }
        }
    }
}
out.write("\r\n\r\n");


// End Of Main Template Body ----------------------------------------------------------------------
    }



    {
//Sub-Templates Initialization --------------------------------------------------------------------



//End of Sub-Templates Initialization -------------------------------------------------------------
    }

}

