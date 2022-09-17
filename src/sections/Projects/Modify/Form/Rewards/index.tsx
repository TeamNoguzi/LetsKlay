import { Collapse, Container, Form, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "stories/Buttons/Button";
import { FindProjectFullResponseDto, FindRewardResponseDto } from "@/dto";
import { useProjectsUpdateMutation } from "hooks/queries";
import { useState } from "react";
import RewardCard from "stories/Cards/RewardCard";
import * as S from "./styled";

interface FormInput {
  rewards: FindRewardResponseDto[];
}

interface FormRewardsProps {
  project: FindProjectFullResponseDto;
}

const FormRewards = ({ project }: FormRewardsProps) => {
  const [selected, setSelected] = useState<number>(0);
  const mutation = useProjectsUpdateMutation();
  const { register, handleSubmit, watch } = useForm<FormInput>({
    defaultValues: {
      ...project,
    },
  });

  const handleValidSubmit: SubmitHandler<FormInput> = (data) =>
    mutation.mutate({ project: { ...project, rewards: data.rewards } });

  const handleAddReward = () => {};
  const handleAddItem = () => {};

  return (
    <>
      <S.FormTitle>Rewards</S.FormTitle>
      <hr className="mb-5" />
      <Button variant="outline" className="mb-3" onClick={handleAddReward}>
        Add New Reward
      </Button>

      <Form onSubmit={handleSubmit(handleValidSubmit)}>
        {project.rewards.map((reward, index) => (
          <>
            <S.RewardToggle onClick={() => setSelected(index)}>{reward.title}</S.RewardToggle>

            <Collapse in={selected === index} css={S.collapseStyle}>
              <Container className="my-1">
                <Row>
                  <Col md={12} lg={7} xl={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        {...register(`rewards.${index}.title`, { required: true })}
                        placeholder="Beginner's pack"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        {...register(`rewards.${index}.description`, {
                          required: true,
                        })}
                        placeholder="save money with beginner's pack"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        {...register(`rewards.${index}.price`, {
                          required: true,
                        })}
                        type="number"
                        min="0"
                        step="any"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        {...register(`rewards.${index}.maxStock`, {
                          required: true,
                        })}
                        type="number"
                        min="1"
                      />
                    </Form.Group>

                    {project.rewards[index].items.map((item, itemIndex) => (
                      <Container className="px-0">
                        <Row className="align-items-end">
                          <Col xs={12} sm={3}>
                            <Form.Group className="mb-3">
                              <Form.Label>Items</Form.Label>
                              <Form.Control
                                {...register(`rewards.${index}.items.${itemIndex}.quantity`, {
                                  required: true,
                                })}
                                type="number"
                                min="1"
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Control
                                {...register(`rewards.${index}.items.${itemIndex}.name`, {
                                  required: true,
                                })}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Container>
                    ))}

                    <Button variant="outline" className="mb-3" onClick={handleAddItem}>
                      Add Reward Item
                    </Button>
                  </Col>

                  <Col lg={5} xl={4}>
                    <RewardCard reward={watch(`rewards.${index}`)} />
                  </Col>
                </Row>
              </Container>
            </Collapse>
          </>
        ))}

        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default FormRewards;
