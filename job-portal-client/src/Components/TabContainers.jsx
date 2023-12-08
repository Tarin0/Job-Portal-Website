import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../style/react-tabs.css'
import TabCard from './TabCard';
import { useLoaderData } from 'react-router-dom';
const TabContainers = () => {
    const jobs = useLoaderData();
    const webJobs = jobs.filter(job => job.category === "Web Development");
    const graphicsJobs = jobs.filter(job => job.category === "Graphics Design");
    const marketingJobs = jobs.filter(job => job.category === "Digital Marketing");
         console.log(webJobs);           
    return (
        <div>
            <div className='mx-8 mb-8 relative top-[600px]'>
                <Tabs>
                    <TabList>
                        <Tab>Web Development</Tab>
                        <Tab>Graphic Design</Tab>
                        <Tab>Digital Marketing</Tab>
                    </TabList>

                    <TabPanel>
                        <TabCard jobs={webJobs} />
                    </TabPanel>
                    <TabPanel>
                        <TabCard jobs={graphicsJobs} />
                    </TabPanel>
                    <TabPanel>
                        <TabCard jobs={marketingJobs} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default TabContainers;