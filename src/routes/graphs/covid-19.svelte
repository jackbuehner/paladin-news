<style>
  .phase {
    float: right;
    position: relative;
    top: 44px;
    padding-right: 6px;
    padding-left: 6px;
    border: 1px solid #eeef00;
    border-radius: 2px;
    background-color: rgba(255, 255, 0, 0.27);
    font-size: 14px;
    font-family: var(--font-detail);
    line-height: 24px;
    font-weight: 700;
  }
  .purple {
    border-color: rgba(146, 75, 184, 0.4);
    background-color: rgba(146, 75, 184, 0.12);
  }
  @media (max-width: 560px) {
    .phase {
      float: unset;
      position: absolute;
      top: 53px;
      left: 0;
      padding: 2px 20px;
      width: 100%;
      border-radius: 0;
      border-width: 0;
      text-align: center;
    }
  }
</style>

<script>
  import PageHeading from '/src/components/PageHeading.svelte';
  import Container from '/src/components/Container.svelte';
  import { Tabs, TabList, TabPanel, Tab } from '../../components/Tabs';
</script>

<div style={'height: 0;'}>
  <Container>
    <div class={'phase purple'}>Purple Operational Phase</div>
  </Container>
</div>

<PageHeading
  type={'block'}
  subtitle={'Data visualizations for student testing, positivity rates, and quarantine/isolation space on campus. For updated disease metrics in South Carolina by county, <a href="https://scdhec.gov/covid19/south-carolina-county-level-data-covid-19">visit SC DHEC</a>.'}
  >COVID-19 on Campus</PageHeading>

<div style={'margin: -20px 0 0 0;'}>
  <Tabs>
    <TabList>
      <Tab grow>2020</Tab>
      <Tab grow isDefault>2021</Tab>
    </TabList>

    <TabPanel>
      <Container>
        <div id={'vizFrame1611153184053'}>
          <div class="tableauPlaceholder" id="viz1611153184053" style="position: relative">
            <noscript
              ><a href="/"
                ><img
                  alt=" "
                  src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;v2&#47;v2coviddashboard&#47;Studenttestingdashboard&#47;1_rss.png"
                  style="border: none" /></a
              ></noscript
            ><object class="tableauViz" style="display:none;" title={'covid testing 2020'}>
              <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
              <param name="embed_code_version" value="3" />
              <param name="site_root" value="" />
              <param name="name" value="v2coviddashboard&#47;Studenttestingdashboard" />
              <param name="tabs" value="no" />
              <param name="toolbar" value="top" />
              <param
                name="static_image"
                value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;v2&#47;v2coviddashboard&#47;Studenttestingdashboard&#47;1.png" />
              <param name="animate_transition" value="yes" />
              <param name="display_static_image" value="yes" />
              <param name="display_spinner" value="yes" />
              <param name="display_overlay" value="yes" />
              <param name="display_count" value="yes" />
              <param name="language" value="en" />
              <param name="showShareOptions" value="false" />
              <param name="device" value="phone" />
              <param name="filter" value="publish=yes" /></object>
          </div>
          <script type="text/javascript">
            var divElement = document.getElementById('viz1611153184053');
            var vizElement = divElement.getElementsByTagName('object')[0];
            vizElement.style.width = '100%';
            vizElement.style.height = '727px';
            var scriptElement = document.createElement('script');
            scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
            vizElement.parentNode.insertBefore(scriptElement, vizElement);
          </script>
          <style>
            #vizFrame1611153184053 {
              margin-top: -27px;
              background: white;
              position: relative;
              z-index: 1;
            }
            #viz1611153184053 {
              height: 684px !important;
            }
          </style>
        </div>
        <div id={'vizFrame1611153331235'}>
          <div class="tableauPlaceholder" id="viz1611153331235" style="position: relative">
            <noscript
              ><a href="/"
                ><img
                  alt=" "
                  src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Qu&#47;QuarantineIsolationSpaceonCampus&#47;QuarantineIsolationSpace&#47;1_rss.png"
                  style="border: none" /></a
              ></noscript
            ><object class="tableauViz" style="display:none;" title={'quarantine graph 2020'}>
              <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
              <param name="embed_code_version" value="3" />
              <param name="site_root" value="" />
              <param
                name="name"
                value="QuarantineIsolationSpaceonCampus&#47;QuarantineIsolationSpace" />
              <param name="tabs" value="no" />
              <param name="toolbar" value="top" />
              <param
                name="static_image"
                value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Qu&#47;QuarantineIsolationSpaceonCampus&#47;QuarantineIsolationSpace&#47;1.png" />
              <param name="animate_transition" value="yes" />
              <param name="display_static_image" value="yes" />
              <param name="display_spinner" value="yes" />
              <param name="display_overlay" value="yes" />
              <param name="display_count" value="yes" />
              <param name="language" value="en" />
              <param name="device" value="phone" />
              <param name="filter" value="publish=yes" /></object>
          </div>
          <script type="text/javascript">
            var divElement = document.getElementById('viz1611153331235');
            var vizElement = divElement.getElementsByTagName('object')[0];
            vizElement.style.width = '100%';
            vizElement.style.height = '727px';
            var scriptElement = document.createElement('script');
            scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
            vizElement.parentNode.insertBefore(scriptElement, vizElement);
          </script>
          <style>
            #vizFrame1611153331235 {
              margin-top: -42px !important;
            }
          </style>
        </div>
      </Container>
    </TabPanel>

    <TabPanel>
      <Container>
        <div id={'vizFrame1611285923720'}>
          <div class="tableauPlaceholder" id="viz1611285923720" style="position: relative">
            <noscript
              ><a href="/"
                ><img
                  alt=" "
                  src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;co&#47;covidstudenttestingdashboard2021data&#47;studenttestingdashboard&#47;1_rss.png"
                  style="border: none" /></a
              ></noscript
            ><object class="tableauViz" style="display:none;" title={'testing graph 2021'}>
              <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
              <param name="embed_code_version" value="3" />
              <param name="site_root" value="" />
              <param
                name="name"
                value="covidstudenttestingdashboard2021data&#47;studenttestingdashboard" />
              <param name="tabs" value="no" />
              <param name="toolbar" value="top" />
              <param
                name="static_image"
                value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;co&#47;covidstudenttestingdashboard2021data&#47;studenttestingdashboard&#47;1.png" />
              <param name="animate_transition" value="yes" />
              <param name="display_static_image" value="yes" />
              <param name="display_spinner" value="yes" />
              <param name="display_overlay" value="yes" />
              <param name="display_count" value="yes" />
              <param name="language" value="en" />
              <param name="showShareOptions" value="false" />
              <param name="device" value="phone" />
              <param name="filter" value="publish=yes" /></object>
          </div>
          <style>
            #vizFrame1611285923720 {
              margin-top: -27px;
              background: white;
              position: relative;
              z-index: 1;
            }
            #viz1611285923720 {
              height: 684px !important;
            }
          </style>
        </div>
        <div id={'vizFrame1611286035977'}>
          <script type="text/javascript">
            var divElement = document.getElementById('viz1611285923720');
            var vizElement = divElement.getElementsByTagName('object')[0];
            vizElement.style.width = '100%';
            vizElement.style.height = '727px';
            var scriptElement = document.createElement('script');
            scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
            vizElement.parentNode.insertBefore(scriptElement, vizElement);
          </script>

          <div class="tableauPlaceholder" id="viz1611286035977" style="position: relative">
            <noscript
              ><a href="/"
                ><img
                  alt=" "
                  src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;qu&#47;quarantinespace2021&#47;QuarantineIsolationSpace&#47;1_rss.png"
                  style="border: none" /></a
              ></noscript
            ><object class="tableauViz" style="display:none;" title={'quarantine graph 2021'}>
              <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
              <param name="embed_code_version" value="3" />
              <param name="site_root" value="" />
              <param name="name" value="quarantinespace2021&#47;QuarantineIsolationSpace" />
              <param name="tabs" value="no" />
              <param name="toolbar" value="top" />
              <param
                name="static_image"
                value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;qu&#47;quarantinespace2021&#47;QuarantineIsolationSpace&#47;1.png" />
              <param name="animate_transition" value="yes" />
              <param name="display_static_image" value="yes" />
              <param name="display_spinner" value="yes" />
              <param name="display_overlay" value="yes" />
              <param name="display_count" value="yes" />
              <param name="language" value="en" />
              <param name="device" value="phone" />
              <param name="filter" value="publish=yes" /></object>
          </div>
          <script type="text/javascript">
            var divElement = document.getElementById('viz1611286035977');
            var vizElement = divElement.getElementsByTagName('object')[0];
            vizElement.style.width = '100%';
            vizElement.style.height = '727px';
            var scriptElement = document.createElement('script');
            scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
            vizElement.parentNode.insertBefore(scriptElement, vizElement);
          </script>
          <style>
            #vizFrame1611286035977 {
              margin-top: -42px !important;
            }
          </style>
        </div>
      </Container>
    </TabPanel>
  </Tabs>
</div>
