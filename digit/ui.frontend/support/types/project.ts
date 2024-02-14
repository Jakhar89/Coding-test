export interface ProjectNeeds {
  /**
   * Define whether any icon structures need to be generated for the project.
   */
  icons: {
    /**
     * Should any tags be generated?
     */
    tags?: boolean;

    /**
     * Does a TypeScript file need to be generated?
     */
    typescript?: string;
  };
}
