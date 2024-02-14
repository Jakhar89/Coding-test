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
package apps.granite.sightly.templates;

import java.io.PrintWriter;
import java.util.Collection;
import javax.script.Bindings;

import org.apache.sling.scripting.sightly.render.RenderUnit;
import org.apache.sling.scripting.sightly.render.RenderContext;

public final class clientlib__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _dynamic_css = getProperty("css");
Object _dynamic_js = getProperty("js");
Object _dynamic_all = getProperty("all");
Object _dynamic_prefetch = getProperty("prefetch");
out.write("\r\n\r\n\r\n");
out.write("\r\n\r\n\r\n");
out.write("\r\n\r\n\r\n");
out.write("\r\n\r\n\r\n");
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
addSubTemplate("all", new RenderUnit() {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Sub-Template Body -------------------------------------------------------------------------

Object _dynamic_request = bindings.get("request");
Object _global_clientlib = null;
Object _dynamic_modulefallback = arguments.get("modulefallback");
Object _dynamic_crossorigin = arguments.get("crossorigin");
Object _dynamic_module = arguments.get("module");
Object _dynamic_categories = arguments.get("categories");
Object _dynamic_loading = arguments.get("loading");
Object _dynamic_onload = arguments.get("onload");
out.write("\r\n    ");
{
    Object var_testvariable8 = renderContext.getObjectModel().resolveProperty(_dynamic_request, "getResourceResolver");
    if (renderContext.getObjectModel().toBoolean(var_testvariable8)) {
_global_clientlib = renderContext.call("use", "granite/sightly/templates/graniteClientLib.html", obj());
        {
            Object var_templatevar10 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "include");
            {
                Object var_templateoptions11_field$_modulefallback = _dynamic_modulefallback;
                {
                    Object var_templateoptions11_field$_crossorigin = _dynamic_crossorigin;
                    {
                        Object var_templateoptions11_field$_module = _dynamic_module;
                        {
                            boolean var_templateoptions11_field$_prefetch = false;
                            {
                                Object var_templateoptions11_field$_categories = _dynamic_categories;
                                {
                                    Object var_templateoptions11_field$_loading = _dynamic_loading;
                                    {
                                        Object var_templateoptions11_field$_onload = _dynamic_onload;
                                        {
                                            java.util.Map var_templateoptions11 = obj().with("moduleFallback", var_templateoptions11_field$_modulefallback).with("crossorigin", var_templateoptions11_field$_crossorigin).with("module", var_templateoptions11_field$_module).with("prefetch", var_templateoptions11_field$_prefetch).with("categories", var_templateoptions11_field$_categories).with("loading", var_templateoptions11_field$_loading).with("onload", var_templateoptions11_field$_onload);
                                            callUnit(out, renderContext, var_templatevar10, var_templateoptions11);
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
}
out.write("\r\n");


// End Of Main Sub-Template Body ------------------------------------------------------------------
    }



    {
//Sub-Sub-Templates Initialization ----------------------------------------------------------------



//End of Sub-Sub-Templates Initialization ---------------------------------------------------------
    }
    
});
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
addSubTemplate("css", new RenderUnit() {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Sub-Template Body -------------------------------------------------------------------------

Object _dynamic_request = bindings.get("request");
Object _global_clientlib = null;
Object _dynamic_crossorigin = arguments.get("crossorigin");
Object _dynamic_categories = arguments.get("categories");
Object _dynamic_critical = arguments.get("critical");
out.write("\r\n    ");
{
    Object var_testvariable0 = renderContext.getObjectModel().resolveProperty(_dynamic_request, "getResourceResolver");
    if (renderContext.getObjectModel().toBoolean(var_testvariable0)) {
_global_clientlib = renderContext.call("use", "granite/sightly/templates/graniteClientLib.html", obj());
        {
            Object var_templatevar2 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "include");
            {
                String var_templateoptions3_field$_mode = "css";
                {
                    Object var_templateoptions3_field$_crossorigin = _dynamic_crossorigin;
                    {
                        Object var_templateoptions3_field$_categories = _dynamic_categories;
                        {
                            Object var_templateoptions3_field$_critical = _dynamic_critical;
                            {
                                boolean var_templateoptions3_field$_prefetch = false;
                                {
                                    java.util.Map var_templateoptions3 = obj().with("mode", var_templateoptions3_field$_mode).with("crossorigin", var_templateoptions3_field$_crossorigin).with("categories", var_templateoptions3_field$_categories).with("critical", var_templateoptions3_field$_critical).with("prefetch", var_templateoptions3_field$_prefetch);
                                    callUnit(out, renderContext, var_templatevar2, var_templateoptions3);
                                }
                            }
                        }
                    }
                }
            }
        }
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
addSubTemplate("prefetch", new RenderUnit() {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Sub-Template Body -------------------------------------------------------------------------

Object _dynamic_request = bindings.get("request");
Object _global_clientlib = null;
Object _dynamic_modulefallback = arguments.get("modulefallback");
Object _dynamic_categories = arguments.get("categories");
Object _dynamic_module = arguments.get("module");
out.write("\r\n    ");
{
    Object var_testvariable12 = renderContext.getObjectModel().resolveProperty(_dynamic_request, "getResourceResolver");
    if (renderContext.getObjectModel().toBoolean(var_testvariable12)) {
_global_clientlib = renderContext.call("use", "granite/sightly/templates/graniteClientLib.html", obj());
        {
            Object var_templatevar14 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "include");
            {
                Object var_templateoptions15_field$_modulefallback = _dynamic_modulefallback;
                {
                    Object var_templateoptions15_field$_categories = _dynamic_categories;
                    {
                        Object var_templateoptions15_field$_module = _dynamic_module;
                        {
                            boolean var_templateoptions15_field$_prefetch = true;
                            {
                                java.util.Map var_templateoptions15 = obj().with("moduleFallback", var_templateoptions15_field$_modulefallback).with("categories", var_templateoptions15_field$_categories).with("module", var_templateoptions15_field$_module).with("prefetch", var_templateoptions15_field$_prefetch);
                                callUnit(out, renderContext, var_templatevar14, var_templateoptions15);
                            }
                        }
                    }
                }
            }
        }
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
addSubTemplate("js", new RenderUnit() {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Sub-Template Body -------------------------------------------------------------------------

Object _dynamic_request = bindings.get("request");
Object _global_clientlib = null;
Object _dynamic_modulefallback = arguments.get("modulefallback");
Object _dynamic_crossorigin = arguments.get("crossorigin");
Object _dynamic_module = arguments.get("module");
Object _dynamic_categories = arguments.get("categories");
Object _dynamic_loading = arguments.get("loading");
Object _dynamic_onload = arguments.get("onload");
out.write("\r\n    ");
{
    Object var_testvariable4 = renderContext.getObjectModel().resolveProperty(_dynamic_request, "getResourceResolver");
    if (renderContext.getObjectModel().toBoolean(var_testvariable4)) {
_global_clientlib = renderContext.call("use", "granite/sightly/templates/graniteClientLib.html", obj());
        {
            Object var_templatevar6 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "include");
            {
                String var_templateoptions7_field$_mode = "js";
                {
                    Object var_templateoptions7_field$_modulefallback = _dynamic_modulefallback;
                    {
                        Object var_templateoptions7_field$_crossorigin = _dynamic_crossorigin;
                        {
                            Object var_templateoptions7_field$_module = _dynamic_module;
                            {
                                boolean var_templateoptions7_field$_prefetch = false;
                                {
                                    Object var_templateoptions7_field$_categories = _dynamic_categories;
                                    {
                                        Object var_templateoptions7_field$_loading = _dynamic_loading;
                                        {
                                            Object var_templateoptions7_field$_onload = _dynamic_onload;
                                            {
                                                java.util.Map var_templateoptions7 = obj().with("mode", var_templateoptions7_field$_mode).with("moduleFallback", var_templateoptions7_field$_modulefallback).with("crossorigin", var_templateoptions7_field$_crossorigin).with("module", var_templateoptions7_field$_module).with("prefetch", var_templateoptions7_field$_prefetch).with("categories", var_templateoptions7_field$_categories).with("loading", var_templateoptions7_field$_loading).with("onload", var_templateoptions7_field$_onload);
                                                callUnit(out, renderContext, var_templatevar6, var_templateoptions7);
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

