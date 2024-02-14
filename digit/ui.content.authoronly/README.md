## Showcase
For automation, each container and component requiring automation should have a unique ID.


`{componentType}_description_{scenario}`

eg
```xml
<container
  id="container_secondary_product_card_default">
  <teaser_secondary_product_card_default
    id="teaser_secondary_product_card_default">
  </teaser_secondary_product_card_default>
</container>

<container
  id="container_secondary_product_card_no_cta">
  <teaser_secondary_product_card_no_cta
    id="teaser_secondary_product_card_no_cta">
  </teaser_secondary_product_card_no_cta>
</container>
```

### Tasks
Run the below to remove redundant _createdBy_, _lastModifiedBy_ etc content when syncing from CRX.
```bash
sed -E -i '' '/(cq|jcr):(created|lastModified)/d' **/*/showcase/**/*/.content.xml
```
